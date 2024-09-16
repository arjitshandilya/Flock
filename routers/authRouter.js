// routes/authRouter.js
import {
  signupController,
  loginController,
} from "../controllers/authController.js";
import { Hono } from "hono";

const authRouter = new Hono();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);

export { authRouter };
