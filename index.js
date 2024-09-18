// index.js
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authRouter } from "./routers/authRouter.js"; // Import the auth router
import { userRouter } from "./routers/userRouter.js";
import { leadRouter } from "./routers/leadRouter.js";
import { proposalRouter } from "./routers/proposalRouter.js";
import { communicationRouter } from "./routers/communicationRouter.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { secureHeaders } from "hono/secure-headers";
import { leadAssignmentRouter } from "./routers/leadAssignmentRouter.js";
// Initialize the app
const app = new Hono();
app.use(secureHeaders());

// Use routers
app.route("/auth", authRouter); // Mount auth router

app.use("*", authMiddleware);

app.route("/users", userRouter);
app.route("/leads", leadRouter);
app.route("/proposals", proposalRouter);
app.route("/communications", communicationRouter);
app.route("/lead-assignments", leadAssignmentRouter);

// Route: Home
app.get("/", (c) => c.text("Welcome to Flock Energy CRM!"));

// Start the server
serve(app);
