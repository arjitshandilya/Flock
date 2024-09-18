import { db, users } from "../config/db.js";
import { eq } from "drizzle-orm";

// Get all users
export const getAllUsers = async (c) => {
  try {
    const allUsers = await db.select().from(users);
    return c.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: "Failed to fetch users" }, 500);
  }
};

// Get user by ID
export const getUserById = async (c) => {
  try {
    const userId = parseInt(c.req.param("id"), 10);
    const user = await db.select().from(users).where(eq(users.id, userId));
    if (user.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json(user[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.json({ error: "Failed to fetch user" }, 500);
  }
};
// Update a user by ID
export const updateUser = async (c) => {
  try {
    const userId = c.req.param("id");
    const { username, email, hashedPassword, role } = await c.req.json();

    const user = await db.select().from(users).where(eq(users.id, userId));
    if (user.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    const updatedUser = {
      ...(username && { username }),
      ...(email && { email }),
      ...(hashedPassword && { hashedPassword }),
      ...(role && { role }),
    };

    await db.update(users).set(updatedUser).where(eq(users.id, userId));
    return c.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return c.json({ error: "Failed to update user" }, 500);
  }
};

// Delete a user by ID
export const deleteUser = async (c) => {
  try {
    const userId = c.req.param("id");
    const user = await db.select().from(users).where(eq(users.id, userId));
    if (user.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }

    await db.delete(users).where(eq(users.id, userId));
    return c.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return c.json({ error: "Failed to delete user" }, 500);
  }
};
