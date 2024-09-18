import pg from "pg";

const { Pool } = pg;
// Initialize PostgreSQL client
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

const authMiddleware = async (c, next) => {
  try {
    // Log headers and cookies for debugging
    console.log("Raw Cookie Header:", c.req.header("Cookie"));

    // Extract session ID from Cookie header
    const cookieHeader = c.req.header("Cookie");
    const cookies = cookieHeader
      ? cookieHeader.split("; ").reduce((acc, cookie) => {
          const [name, value] = cookie.split("=");
          acc[name] = value;
          return acc;
        }, {})
      : {};
    const sessionId = cookies["session_id"]; // Adjust 'session_id' to your cookie name
    console.log("Extracted Session ID:", sessionId);

    if (!sessionId) {
      return c.json({ message: "Authentication required" }, 401);
    }

    // Verify session ID manually by querying the database
    const { rows } = await pool.query("SELECT * FROM sessions WHERE id = $1", [
      sessionId,
    ]);

    const session = rows[0];

    if (!session) {
      return c.json({ message: "Invalid or expired session" }, 401);
    }

    // Attach user info to context
    c.req.user = session.user_id; // Adjust based on your session schema

    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
};

export default authMiddleware;
