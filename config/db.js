// config/db.js
import { drizzle } from "drizzle-orm/node-postgres";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  decimal,
} from "drizzle-orm/pg-core";
import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

const db = drizzle(pool);

// Test database connection
(async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

// Schema definitions
const users = pgTable("users", {
  id: varchar("id", { length: 50 }).primaryKey(), // Ensure this matches the type in sessions
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const sessions = pgTable("sessions", {
  id: varchar("id", { length: 50 }).primaryKey(), // Session ID
  userId: varchar("user_id") // Foreign key to users table
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  propertyType: varchar("property_type", { length: 50 }),
  rooftopSize: decimal("rooftop_size", { precision: 10, scale: 2 }),
  approximateIncome: decimal("approximate_income", { precision: 15, scale: 2 }),
  estimatedSavings: decimal("estimated_savings", { precision: 15, scale: 2 }),
  shadingConditions: text("shading_conditions"),
  conversionLikelihood: integer("conversion_likelihood"),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  userId: integer("user_id").references(() => users.id),
  proposalStatus: varchar("proposal_status", { length: 50 }).notNull(),
  proposalDate: timestamp("proposal_date").defaultNow(),
  followUpDate: timestamp("follow_up_date"),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const communications = pgTable("communications", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  userId: integer("user_id").references(() => users.id),
  communicationType: varchar("communication_type", { length: 50 }).notNull(),
  content: text("content").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const leadAssignments = pgTable("lead_assignments", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  previousUserId: integer("previous_user_id").references(() => users.id),
  newUserId: integer("new_user_id").references(() => users.id),
  assignmentDate: timestamp("assignment_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
export {
  db,
  users,
  sessions,
  leads,
  proposals,
  communications,
  leadAssignments,
  adapter,
};
