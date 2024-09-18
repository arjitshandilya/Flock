import { Hono } from "hono";
import {
  createProposal,
  getAllProposals,
  getProposalById,
  getProposalsByLeadId,
  getProposalsByUserId,
  updateProposal,
  deleteProposal,
} from "../controllers/proposalController.js";
import { errorHandler } from "../middleware/errorHandler.js";

const proposalRouter = new Hono();

// Route: Get all proposals
proposalRouter.get("/", errorHandler(getAllProposals));

// Route: Create a new proposal
proposalRouter.post("/", errorHandler(createProposal));

// Route: Get a proposal by ID
proposalRouter.get("/:id", errorHandler(getProposalById));

// Route: Update a proposal by ID
proposalRouter.put("/:id", errorHandler(updateProposal));

// Route: Delete a proposal by ID
proposalRouter.delete("/:id", errorHandler(deleteProposal));

// Route: Get proposals by lead ID
proposalRouter.get("/lead/:leadId", errorHandler(getProposalsByLeadId));

// Route: Get all proposals by user ID
proposalRouter.get("/user/:userId", errorHandler(getProposalsByUserId));

export { proposalRouter };
