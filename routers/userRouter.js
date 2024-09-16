import { Hono } from "hono";
import { getAllUsers, getUserById } from "../controllers/userController.js";
import { errorHandler } from "../middleware/errorHandler.js";

const userRouter = new Hono();

// Route: Get all users
userRouter.get("/", errorHandler(getAllUsers));

// Route: Get a user by ID
userRouter.get("/:id", errorHandler(getUserById));

export { userRouter };
