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
