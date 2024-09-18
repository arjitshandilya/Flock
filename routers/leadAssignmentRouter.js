import { Hono } from "hono";
import {
  createLeadAssignment,
  getAllLeadAssignments,
  getLeadAssignmentById,
  updateLeadAssignment,
  deleteLeadAssignment,
  getLeadAssignmentsByLeadId,
  getLeadAssignmentsByUserId,
} from "../controllers/leadAssignmentController.js";
import { errorHandler } from "../middleware/errorHandler.js";

const leadAssignmentRouter = new Hono();

// Route: Create a new lead assignment
leadAssignmentRouter.post("/", errorHandler(createLeadAssignment));

// Route: Get all lead assignments
leadAssignmentRouter.get("/", errorHandler(getAllLeadAssignments));

// Route: Get a lead assignment by ID
leadAssignmentRouter.get("/:id", errorHandler(getLeadAssignmentById));

// Route: Update a lead assignment by ID
leadAssignmentRouter.put("/:id", errorHandler(updateLeadAssignment));

// Route: Delete a lead assignment by ID
leadAssignmentRouter.delete("/:id", errorHandler(deleteLeadAssignment));

// Route: Get lead assignments by lead ID
leadAssignmentRouter.get(
  "/lead/:leadId",
  errorHandler(getLeadAssignmentsByLeadId)
);

// Route: Get lead assignments by user ID (previous or new user)
leadAssignmentRouter.get(
  "/user/:userId",
  errorHandler(getLeadAssignmentsByUserId)
);

export { leadAssignmentRouter };
