// index.js
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authRouter } from "./routers/authRouter.js"; // Import the auth router
import { userRouter } from "./routers/userRouter.js";
import { leadRouter } from "./routers/leadRouter.js";
import { prettyJSON } from "hono/pretty-json";

// Initialize the app
const app = new Hono();

// Use routers
app.route("/auth", authRouter); // Mount auth router
app.route("/users", userRouter);
app.route("/leads", leadRouter);

// Route: Home
app.get("/", (c) => c.text("Welcome to Flock Energy CRM!"));

// Start the server
serve(app);
