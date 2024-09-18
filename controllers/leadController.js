import { db, leads } from "../config/db.js";
import { eq } from "drizzle-orm";

// Get all leads
export const getAllLeads = async (c) => {
  try {
    const allLeads = await db.select().from(leads);
    return c.json(allLeads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    return c.json({ error: "Failed to fetch leads" }, 500);
  }
};

// Get lead by ID
export const getLeadById = async (c) => {
  try {
    const leadId = parseInt(c.req.param("id"), 10);
    const lead = await db.select().from(leads).where(eq(leads.id, leadId));
    if (lead.length === 0) {
      return c.json({ error: "Lead not found" }, 404);
    }
    return c.json(lead[0]);
  } catch (error) {
    console.error("Error fetching lead:", error);
    return c.json({ error: "Failed to fetch lead" }, 500);
  }
};

// Create a new lead
export const createLead = async (c) => {
  try {
    const {
      userId,
      propertyType,
      rooftopSize,
      approximateIncome,
      estimatedSavings,
      shadingConditions,
      conversionLikelihood,
      status,
    } = await c.req.json();
    const newLead = {
      userId,
      propertyType,
      rooftopSize,
      approximateIncome,
      estimatedSavings,
      shadingConditions,
      conversionLikelihood,
      status,
    };
    const [result] = await db.insert(leads).values(newLead).returning();
    return c.json({ message: "Lead created successfully", lead: result }, 201);
  } catch (error) {
    console.error("Error creating lead:", error);
    return c.json({ error: "Failed to create lead" }, 500);
  }
};

// Update a lead by ID
export const updateLead = async (c) => {
  try {
    const leadId = parseInt(c.req.param("id"), 10);
    const {
      userId,
      propertyType,
      rooftopSize,
      approximateIncome,
      estimatedSavings,
      shadingConditions,
      conversionLikelihood,
      status,
    } = await c.req.json();

    const lead = await db.select().from(leads).where(eq(leads.id, leadId));
    if (lead.length === 0) {
      return c.json({ error: "Lead not found" }, 404);
    }

    const updatedLead = {
      ...(userId !== undefined && { userId }),
      ...(propertyType !== undefined && { propertyType }),
      ...(rooftopSize !== undefined && { rooftopSize }),
      ...(approximateIncome !== undefined && { approximateIncome }),
      ...(estimatedSavings !== undefined && { estimatedSavings }),
      ...(shadingConditions !== undefined && { shadingConditions }),
      ...(conversionLikelihood !== undefined && { conversionLikelihood }),
      ...(status !== undefined && { status }),
    };

    await db.update(leads).set(updatedLead).where(eq(leads.id, leadId));
    return c.json({ message: "Lead updated successfully" });
  } catch (error) {
    console.error("Error updating lead:", error);
    return c.json({ error: "Failed to update lead" }, 500);
  }
};

// Delete a lead by ID
export const deleteLead = async (c) => {
  try {
    const leadId = parseInt(c.req.param("id"), 10);
    const lead = await db.select().from(leads).where(eq(leads.id, leadId));
    if (lead.length === 0) {
      return c.json({ error: "Lead not found" }, 404);
    }

    await db.delete(leads).where(eq(leads.id, leadId));
    return c.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return c.json({ error: "Failed to delete lead" }, 500);
  }
};
