import { db, proposals, leads, users } from "../config/db.js";
import { eq } from "drizzle-orm";

// Create a new proposal
export const createProposal = async (c) => {
  try {
    const { leadId, userId, proposalStatus, followUpDate, details } =
      await c.req.json();

    // Convert followUpDate to Date object if it's provided
    const followUpDateObj = followUpDate ? new Date(followUpDate) : null;

    // Check if leadId exists in leads table
    const lead = await db.select().from(leads).where(eq(leads.id, leadId));
    if (lead.length === 0) {
      return c.json({ error: "Lead not found" }, 400);
    }

    // Check if userId exists in users table
    const user = await db.select().from(users).where(eq(users.id, userId));
    if (user.length === 0) {
      return c.json({ error: "User not found" }, 400);
    }

    const newProposal = {
      leadId,
      userId,
      proposalStatus,
      followUpDate: followUpDateObj, // Pass Date object
      details,
    };

    const [result] = await db.insert(proposals).values(newProposal).returning();
    return c.json(
      { message: "Proposal created successfully", proposal: result },
      201
    );
  } catch (error) {
    console.error("Error creating proposal:", error);
    return c.json({ error: "Failed to create proposal" }, 500);
  }
};

// Get proposal by ID
export const getProposalById = async (c) => {
  try {
    const proposalId = parseInt(c.req.param("id"), 10);
    const proposal = await db
      .select()
      .from(proposals)
      .where(eq(proposals.id, proposalId));
    if (proposal.length === 0) {
      return c.json({ error: "Proposal not found" }, 404);
    }
    return c.json(proposal[0]);
  } catch (error) {
    console.error("Error fetching proposal:", error);
    return c.json({ error: "Failed to fetch proposal" }, 500);
  }
};

// Update a proposal by ID
export const updateProposal = async (c) => {
  try {
    const proposalId = parseInt(c.req.param("id"), 10);
    const { leadId, userId, proposalStatus, followUpDate, details } =
      await c.req.json();

    // Convert followUpDate to Date object if it's provided
    const followUpDateObj = followUpDate ? new Date(followUpDate) : null;

    // Check if the proposal exists
    const proposal = await db
      .select()
      .from(proposals)
      .where(eq(proposals.id, proposalId));
    if (proposal.length === 0) {
      return c.json({ error: "Proposal not found" }, 404);
    }

    // Validate existence of leadId and userId if provided
    if (leadId !== undefined) {
      const lead = await db.select().from(leads).where(eq(leads.id, leadId));
      if (lead.length === 0) {
        return c.json({ error: "Lead not found" }, 400);
      }
    }

    if (userId !== undefined) {
      const user = await db.select().from(users).where(eq(users.id, userId));
      if (user.length === 0) {
        return c.json({ error: "User not found" }, 400);
      }
    }

    const updatedProposal = {
      ...(leadId !== undefined && { leadId }),
      ...(userId !== undefined && { userId }),
      ...(proposalStatus !== undefined && { proposalStatus }),
      ...(followUpDate !== undefined && { followUpDate: followUpDateObj }), // Pass Date object
      ...(details !== undefined && { details }),
    };

    await db
      .update(proposals)
      .set(updatedProposal)
      .where(eq(proposals.id, proposalId));
    return c.json({ message: "Proposal updated successfully" });
  } catch (error) {
    console.error("Error updating proposal:", error);
    return c.json({ error: "Failed to update proposal" }, 500);
  }
};

// Delete a proposal by ID
export const deleteProposal = async (c) => {
  try {
    const proposalId = parseInt(c.req.param("id"), 10);
    const proposal = await db
      .select()
      .from(proposals)
      .where(eq(proposals.id, proposalId));
    if (proposal.length === 0) {
      return c.json({ error: "Proposal not found" }, 404);
    }

    await db.delete(proposals).where(eq(proposals.id, proposalId));
    return c.json({ message: "Proposal deleted successfully" });
  } catch (error) {
    console.error("Error deleting proposal:", error);
    return c.json({ error: "Failed to delete proposal" }, 500);
  }
};
export const getAllProposals = async (c) => {
  try {
    const allProposals = await db.select().from(proposals);
    return c.json(allProposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return c.json({ error: "Failed to fetch proposals" }, 500);
  }
};
// Get proposals by lead ID
export const getProposalsByLeadId = async (c) => {
  try {
    const leadId = parseInt(c.req.param("leadId"), 10);
    const proposalsByLead = await db
      .select()
      .from(proposals)
      .where(eq(proposals.leadId, leadId));
    return c.json(proposalsByLead);
  } catch (error) {
    console.error("Error fetching proposals by lead ID:", error);
    return c.json({ error: "Failed to fetch proposals by lead ID" }, 500);
  }
};

// Get all proposals by user ID
export const getProposalsByUserId = async (c) => {
  try {
    const userId = parseInt(c.req.param("userId"), 10);
    const proposalsByUser = await db
      .select()
      .from(proposals)
      .where(eq(proposals.userId, userId));
    return c.json(proposalsByUser);
  } catch (error) {
    console.error("Error fetching proposals by user ID:", error);
    return c.json({ error: "Failed to fetch proposals by user ID" }, 500);
  }
};
