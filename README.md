### Updated `README.md`

```md
# Flock Application

## Overview
Flock is a backend application that manages user proposals, lead assignments, and communications. It supports CRUD operations for users, leads, proposals, lead assignments, and communication entries, providing robust functionality for handling these entities.

### Features
- User and Lead management with CRUD operations.
- Proposal management linked to leads and users.
- Communication tracking with detailed content and timestamps.
- Lead assignment operations with previous and new user tracking.
  
### Technologies Used
- Node.js
- Hono (for routing)
- Drizzle ORM
- PostgreSQL

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nitishkapoor18/Flock.git
   cd Flock
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   Create a PostgreSQL database and configure the connection in `config/db.js`.

4. **Run migrations:**
   Make sure your database is set up and run any necessary migrations.

5. **Start the server:**
   ```bash
   npm start
   ```
   The server will start at `http://localhost:3000`.

## API Endpoints

### Users
- **Create a User:** `POST /api/users`
- **Get All Users:** `GET /api/users`
- **Get User by ID:** `GET /api/users/:id`
- **Update User:** `PUT /api/users/:id`
- **Delete User:** `DELETE /api/users/:id`

### Leads
- **Create a Lead:** `POST /api/leads`
- **Get All Leads:** `GET /api/leads`
- **Get Lead by ID:** `GET /api/leads/:id`
- **Update Lead:** `PUT /api/leads/:id`
- **Delete Lead:** `DELETE /api/leads/:id`

### Proposals
- **Create a Proposal:** `POST /api/proposals`
- **Get All Proposals:** `GET /api/proposals`
- **Get Proposal by ID:** `GET /api/proposals/:id`
- **Get Proposals by Lead ID:** `GET /api/proposals/lead/:leadId`
- **Get Proposals by User ID:** `GET /api/proposals/user/:userId`
- **Update Proposal:** `PUT /api/proposals/:id`
- **Delete Proposal:** `DELETE /api/proposals/:id`

### Lead Assignments
- **Create a Lead Assignment:** `POST /api/lead-assignments`
- **Get All Lead Assignments:** `GET /api/lead-assignments`
- **Get Lead Assignment by ID:** `GET /api/lead-assignments/:id`
- **Get Lead Assignments by Lead ID:** `GET /api/lead-assignments/lead/:leadId`
- **Get Lead Assignments by User ID:** `GET /api/lead-assignments/user/:userId`
- **Update Lead Assignment:** `PUT /api/lead-assignments/:id`
- **Delete Lead Assignment:** `DELETE /api/lead-assignments/:id`

### Communications
- **Create a Communication Entry:** `POST /api/communications`
- **Get All Communications:** `GET /api/communications`
- **Get Communication by ID:** `GET /api/communications/:id`
- **Get Communications by Lead ID:** `GET /api/communications/lead/:leadId`
- **Update Communication Entry:** `PUT /api/communications/:id`
- **Delete Communication Entry:** `DELETE /api/communications/:id`

## Authentication
The app uses middleware for authentication, which is applied to all routes requiring user authorization.

## Error Handling
All routes use a centralized error handler to catch and respond to errors uniformly.

## Testing
You can use Postman or any API testing tool to interact with the above routes.
```

### `CHANGELOG.md`

```md
# Changelog

## [Version 2.0] - 2024-09-18

### Added
- CRUD operations for `Proposals`.
  - Create: `POST /api/proposals`
  - Retrieve: `GET /api/proposals/:id`
  - Retrieve All: `GET /api/proposals`
  - Retrieve by Lead ID: `GET /api/proposals/lead/:leadId`
  - Retrieve by User ID: `GET /api/proposals/user/:userId`
  - Update: `PUT /api/proposals/:id`
  - Delete: `DELETE /api/proposals/:id`

- CRUD operations for `Lead Assignments`.
  - Create: `POST /api/lead-assignments`
  - Retrieve: `GET /api/lead-assignments/:id`
  - Retrieve All: `GET /api/lead-assignments`
  - Retrieve by Lead ID: `GET /api/lead-assignments/lead/:leadId`
  - Retrieve by User ID: `GET /api/lead-assignments/user/:userId`
  - Update: `PUT /api/lead-assignments/:id`
  - Delete: `DELETE /api/lead-assignments/:id`

- CRUD operations for `Communications`.
  - Create: `POST /api/communications`
  - Retrieve: `GET /api/communications/:id`
  - Retrieve All: `GET /api/communications`
  - Retrieve by Lead ID: `GET /api/communications/lead/:leadId`
  - Update: `PUT /api/communications/:id`
  - Delete: `DELETE /api/communications/:id`

### Changed
- Updated `Lead` and `User` controllers to improve performance.
- Added timestamp handling improvements in proposals and communications.
