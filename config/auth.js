import { Lucia, TimeSpan } from "lucia";
import { adapter } from "./db.js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

// Configure Lucia
export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
  generateSessionId: uuidv4,
});

// Export lucia instance for use in controllers
export default lucia;
