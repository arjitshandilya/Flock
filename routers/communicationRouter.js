import { Hono } from "hono";
import {
  createCommunication,
  getCommunicationById,
  updateCommunication,
  deleteCommunication,
  getAllCommunications,
  getCommunicationsByLeadId,
} from "../controllers/communicationController.js";
import { errorHandler } from "../middleware/errorHandler.js";

const communicationRouter = new Hono();

// Route: Create a new communication
communicationRouter.post("/", errorHandler(createCommunication));

// Route: Get all communications
communicationRouter.get("/", errorHandler(getAllCommunications));

// Route: Get all communications by lead ID
communicationRouter.get(
  "/lead/:leadId",
  errorHandler(getCommunicationsByLeadId)
);

// Route: Get a communication by ID
communicationRouter.get("/:id", errorHandler(getCommunicationById));

// Route: Update a communication by ID
communicationRouter.put("/:id", errorHandler(updateCommunication));

// Route: Delete a communication by ID
communicationRouter.delete("/:id", errorHandler(deleteCommunication));

export { communicationRouter };
