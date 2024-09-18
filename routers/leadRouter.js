import { Hono } from "hono";
import {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
import { errorHandler } from "../middleware/errorHandler.js";

const leadRouter = new Hono();

// Route: Get all leads
leadRouter.get("/", errorHandler(getAllLeads));

// Route: Get a lead by ID
leadRouter.get("/:id", errorHandler(getLeadById));

// Route: Create a new lead
leadRouter.post("/", errorHandler(createLead));

// Route: Update a lead by ID
leadRouter.put("/:id", errorHandler(updateLead));

// Route: Delete a lead by ID
leadRouter.delete("/:id", errorHandler(deleteLead));

export { leadRouter };
