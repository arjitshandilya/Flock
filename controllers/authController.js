import { verify } from "@node-rs/argon2";
import { hash } from "@node-rs/argon2"; // Import hash function
import { db } from "../config/db.js";
import { eq } from "drizzle-orm";
import { users } from "../config/db.js";
import { lucia } from "../config/auth.js"; // Ensure this is correctly imported
import { setCookie } from "hono/cookie"; // Import setCookie from Hono cookie utilities

export const signupController = async (c) => {
  const body = await c.req.json();
  const { username, password, email, role } = body;

  try {
    if (!username || username.length < 3 || username.length > 31) {
      return c.json({ error: "Invalid username" }, 400);
    }

    if (!password || password.length < 6 || password.length > 255) {
      return c.json({ error: "Invalid password" }, 400);
    }

    // Check if the username already exists
    const existingUserResult = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (existingUserResult.length > 0) {
      return c.json({ error: "Username already exists" }, 400);
    }

    // Hash the user's password
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Insert the new user into the database
    const newUser = await db.insert(users).values({
      username,
      hashedPassword,
      email,
      role,
    });

    // Create a session for the new user

    return c.json({ message: "Signup successful" }, 201);
  } catch (error) {
    console.error("Signup Error:", error);
    return c.json({ error: "An error occurred during signup" }, 500);
  }
};

export const loginController = async (c) => {
  const body = await c.req.json();
  const { username, password } = body;

  try {
    if (!username || username.length < 3 || username.length > 31) {
      return c.json({ error: "Invalid username" }, 400);
    }

    if (!password || password.length < 6 || password.length > 255) {
      return c.json({ error: "Invalid password" }, 400);
    }

    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (userResult.length === 0) {
      return c.json({ error: "Incorrect username or password" }, 401);
    }

    const existingUser = userResult[0];

    const validPassword = await verify(existingUser.hashedPassword, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return c.json({ error: "Incorrect username or password" }, 401);
    }

    if (existingUser && existingUser.id) {
      try {
        // Create a session for the user
        const session = await lucia.createSession(existingUser.id, {});
        console.log("Session created:", session);

        // Set the session cookie using Hono's setCookie
        setCookie(c, "session_id", session.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/", // Ensure the cookie is valid for the entire domain
        });

        return c.json({ message: "Login successful" }, 200);
      } catch (error) {
        console.error("Error creating session:", error);
        return c.json({ error: "Failed to create session" }, 500);
      }
    } else {
      console.error("User ID is not defined");
      return c.json({ error: "User ID is not defined" }, 500);
    }
  } catch (error) {
    console.error("Login Error:", error);
    return c.json({ error: "An error occurred during login" }, 500);
  }
};
