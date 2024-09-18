import { db, proposals, leads, users, communications } from "../config/db.js";
import { eq } from "drizzle-orm";
// Create a new communication entry
export const createCommunication = async (c) => {
  try {
    const { leadId, userId, communicationType, content, sentAt } =
      await c.req.json();

    // Ensure sentAt is a valid ISO 8601 string or null
    const sentAtObj = sentAt ? new Date(sentAt) : null;

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

    // Prepare the new communication data
    const newCommunication = {
      leadId,
      userId,
      communicationType,
      content,
      sentAt: sentAtObj, // Pass Date object
    };

    // Insert the new communication entry
    const [result] = await db
      .insert(communications)
      .values(newCommunication)
      .returning();
    return c.json(
      { message: "Communication created successfully", communication: result },
      201
    );
  } catch (error) {
    console.error("Error creating communication:", error);
    return c.json({ error: "Failed to create communication" }, 500);
  }
};
// Get a communication entry by ID
export const getCommunicationById = async (c) => {
  try {
    const communicationId = parseInt(c.req.param("id"), 10);
    const communication = await db
      .select()
      .from(communications)
      .where(eq(communications.id, communicationId));
    if (communication.length === 0) {
      return c.json({ error: "Communication not found" }, 404);
    }
    return c.json(communication[0]);
  } catch (error) {
    console.error("Error fetching communication:", error);
    return c.json({ error: "Failed to fetch communication" }, 500);
  }
};
// Update a communication entry by ID
export const updateCommunication = async (c) => {
  try {
    const communicationId = parseInt(c.req.param("id"), 10);
    const { leadId, userId, communicationType, content, sentAt } =
      await c.req.json();

    // Ensure sentAt is a valid ISO 8601 string or null
    const sentAtObj = sentAt ? new Date(sentAt) : null;

    // Check if the communication entry exists
    const communication = await db
      .select()
      .from(communications)
      .where(eq(communications.id, communicationId));
    if (communication.length === 0) {
      return c.json({ error: "Communication not found" }, 404);
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

    // Prepare the updated communication data
    const updatedCommunication = {
      ...(leadId !== undefined && { leadId }),
      ...(userId !== undefined && { userId }),
      ...(communicationType !== undefined && { communicationType }),
      ...(content !== undefined && { content }),
      ...(sentAt !== undefined && { sentAt: sentAtObj }), // Pass Date object
    };

    // Update the communication entry
    await db
      .update(communications)
      .set(updatedCommunication)
      .where(eq(communications.id, communicationId));
    return c.json({ message: "Communication updated successfully" });
  } catch (error) {
    console.error("Error updating communication:", error);
    return c.json({ error: "Failed to update communication" }, 500);
  }
};
// Delete a communication entry by ID
export const deleteCommunication = async (c) => {
  try {
    const communicationId = parseInt(c.req.param("id"), 10);

    // Check if the communication entry exists
    const communication = await db
      .select()
      .from(communications)
      .where(eq(communications.id, communicationId));
    if (communication.length === 0) {
      return c.json({ error: "Communication not found" }, 404);
    }

    // Delete the communication entry
    await db
      .delete(communications)
      .where(eq(communications.id, communicationId));
    return c.json({ message: "Communication deleted successfully" });
  } catch (error) {
    console.error("Error deleting communication:", error);
    return c.json({ error: "Failed to delete communication" }, 500);
  }
};

// Get all communications
export const getAllCommunications = async (c) => {
  try {
    const allCommunications = await db.select().from(communications);
    return c.json(allCommunications);
  } catch (error) {
    console.error("Error fetching communications:", error);
    return c.json({ error: "Failed to fetch communications" }, 500);
  }
};
// Get all communications by lead ID
export const getCommunicationsByLeadId = async (c) => {
  try {
    const leadId = parseInt(c.req.param("leadId"), 10);

    // Check if leadId exists in leads table
    const lead = await db.select().from(leads).where(eq(leads.id, leadId));
    if (lead.length === 0) {
      return c.json({ error: "Lead not found" }, 400);
    }

    const communicationsByLead = await db
      .select()
      .from(communications)
      .where(eq(communications.leadId, leadId));
    return c.json(communicationsByLead);
  } catch (error) {
    console.error("Error fetching communications by lead ID:", error);
    return c.json({ error: "Failed to fetch communications" }, 500);
  }
};
