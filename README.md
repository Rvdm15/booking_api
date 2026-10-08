# Booking API

[Nederlandse versie](README.nl.md)

RESTful API for an online booking app, built with **Express.js** and **Prisma** (SQLite).
Final project of the Winc Academy Back-End Development course.

## Features

- CRUD endpoints for users, hosts, properties, bookings and reviews
- Login with JWT authentication (POST,PUT and DELETE require a token)
- Query filters, e.g. `/properties?location=...&pricePerNight=...`
- Logging middleware (method, URL, status and duration of every request)
- Error handling middleware and error reporting to Sentry
- Validation: missing fileds return 400, unknown ids return 404

## Installation

1. Clone the repository and install the packages:

   ```bash
   git clone https://github.com/Rvdm15/booking_api.git
   cd booking_api
   npm install
   ```

2. Create a `.env` file in the root folder:

   ```
   AUTH_SECRET_KEY=yOUR-SECRET-KEY
   SENTRY_DSN=your-sentry-dsn
   ```

## Usage

| Command               | What it does                                  |
| --------------------- | --------------------------------------------- |
| `npm run clean-start` | Reset and seed the database, start the server |
| `npm run dev`         | Start the server on http://localhost:3000     |
| `npm run reset-db`    | Reset and seed the database                   |
| `npm test`            | Run the positive and negative Postman tests   |

**Before running the tests:** always run `npm run reset-db`first, then `npm run dev`, and then `npm test`in a second terminal.

## Authentication

Send a POST request to `/login` with a username and password:

```json
{
  "username": "jdoe",
  "password": "password123"
}
```

Use the returned token in the `Authorization` header for all POST, PUT and DELETE requests.

## Author

Rob van den Maagdenberg - Winc Academy, 2026
