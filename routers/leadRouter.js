import { Hono } from "hono";
import { getAllLeads, getLeadById } from "../controllers/leadController.js";
import { errorHandler } from "../middleware/errorHandler.js";
const leadRouter = new Hono();

// Route: Get all leads
leadRouter.get("/", errorHandler(getAllLeads));

// Route: Get a lead by ID
leadRouter.get("/:id", errorHandler(getLeadById));

export { leadRouter };
