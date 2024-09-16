// config/lucia.js
import { Lucia } from "lucia";
import { adapter } from "./auth.js"; // Import the configured adapter

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => ({
    username: attributes.username,
  }),
});

export { lucia };
