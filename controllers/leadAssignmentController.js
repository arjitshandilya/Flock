import { db, leadAssignments } from "../config/db.js";
import { eq } from "drizzle-orm";

// Create a new lead assignment
export const createLeadAssignment = async (c) => {
  try {
    const { leadId, previousUserId, newUserId, assignmentDate } =
      await c.req.json();
    const newAssignment = await db
      .insert(leadAssignments)
      .values({ leadId, previousUserId, newUserId, assignmentDate })
      .returning();
    return c.json(newAssignment[0]);
  } catch (error) {
    console.error("Error creating lead assignment:", error);
    return c.json({ error: "Failed to create lead assignment" }, 500);
  }
};

// Get all lead assignments
export const getAllLeadAssignments = async (c) => {
  try {
    const allAssignments = await db.select().from(leadAssignments);
    return c.json(allAssignments);
  } catch (error) {
    console.error("Error fetching lead assignments:", error);
    return c.json({ error: "Failed to fetch lead assignments" }, 500);
  }
};

// Get lead assignment by ID
export const getLeadAssignmentById = async (c) => {
  try {
    const assignmentId = parseInt(c.req.param("id"), 10);
    const assignment = await db
      .select()
      .from(leadAssignments)
      .where(eq(leadAssignments.id, assignmentId));
    if (assignment.length === 0) {
      return c.json({ error: "Lead assignment not found" }, 404);
    }
    return c.json(assignment[0]);
  } catch (error) {
    console.error("Error fetching lead assignment:", error);
    return c.json({ error: "Failed to fetch lead assignment" }, 500);
  }
};

// Update a lead assignment by ID
export const updateLeadAssignment = async (c) => {
  try {
    const assignmentId = parseInt(c.req.param("id"), 10);
    const updates = await c.req.json();
    const updatedAssignment = await db
      .update(leadAssignments)
      .set(updates)
      .where(eq(leadAssignments.id, assignmentId))
      .returning();
    return c.json(updatedAssignment[0]);
  } catch (error) {
    console.error("Error updating lead assignment:", error);
    return c.json({ error: "Failed to update lead assignment" }, 500);
  }
};

// Delete a lead assignment by ID
export const deleteLeadAssignment = async (c) => {
  try {
    const assignmentId = parseInt(c.req.param("id"), 10);
    await db
      .delete(leadAssignments)
      .where(eq(leadAssignments.id, assignmentId));
    return c.json({ message: "Lead assignment deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead assignment:", error);
    return c.json({ error: "Failed to delete lead assignment" }, 500);
  }
};

// Get lead assignments by lead ID
export const getLeadAssignmentsByLeadId = async (c) => {
  try {
    const leadId = parseInt(c.req.param("leadId"), 10);
    const assignments = await db
      .select()
      .from(leadAssignments)
      .where(eq(leadAssignments.leadId, leadId));
    return c.json(assignments);
  } catch (error) {
    console.error("Error fetching lead assignments by lead ID:", error);
    return c.json({ error: "Failed to fetch lead assignments" }, 500);
  }
};

// Get lead assignments by user ID (previous or new user)
export const getLeadAssignmentsByUserId = async (c) => {
  try {
    const userId = parseInt(c.req.param("userId"), 10);
    const assignments = await db
      .select()
      .from(leadAssignments)
      .where(eq(leadAssignments.previousUserId, userId))
      .orWhere(eq(leadAssignments.newUserId, userId));
    return c.json(assignments);
  } catch (error) {
    console.error("Error fetching lead assignments by user ID:", error);
    return c.json({ error: "Failed to fetch lead assignments" }, 500);
  }
};
