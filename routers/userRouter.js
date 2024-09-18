import { Hono } from "hono";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { errorHandler } from "../middleware/errorHandler.js";

const userRouter = new Hono();

// Route: Get all users
userRouter.get("/", errorHandler(getAllUsers));

// Route: Get a user by ID
userRouter.get("/:id", errorHandler(getUserById));

// Route: Update a user by ID
userRouter.put("/:id", errorHandler(updateUser));

// Route: Delete a user by ID
userRouter.delete("/:id", errorHandler(deleteUser));

export { userRouter };
