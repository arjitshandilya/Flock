

# Flock Energy Lead Management Platform

This project aims to optimize solar lead management and increase conversion rates. The platform includes real-time updates, lead management, and proposal and communication tracking. 

## Progress So Far
- **Authentication**: Integrated Lucia Auth with PostgreSQL using Drizzle ORM. Login and signup functionality is implemented.
- **Database Schema**: Set up tables for users, leads, proposals, communications, and lead assignments.
- **Backend**: Hono.js for routing and API handling.
- **Frontend**: Planned to use SvelteKit (UI development not started).

## Tech Stack
- **Backend**: Node.js, Hono.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Lucia Auth

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/nitishkapoor18/Flock.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   DB_NAME=
   DB_PORT=
   ```

4. Run the app:
   ```bash
   npm start
   ```

## Current Tables:
1. `users`: Handles user data.
2. `leads`: Stores lead information.
3. `proposals`: Manages proposals.
4. `communications`: Tracks communication history.
5. `lead_assignments`: Logs lead assignments.

## Next Steps
- Finish user authentication.
- Implement front-end with SvelteKit.
- Add analytics and dashboard features.

## License
This project is under the MIT License.

---

