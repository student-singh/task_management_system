**Task Management API**

ProU Technology - Backend API Development (Internship Coding Challenge — Track 2)

## Overview
This repository implements a RESTful API for managing Employees and Tasks. It includes:

This README documents repository structure, setup steps, API endpoints, and troubleshooting tips.

## Features

- CRUD operations for Tasks (create, read, update, delete)
- Create and list Employees
- Tasks linked to Employees via an ObjectId reference
- Filtering tasks by status and by employee
- Input validation with `express-validator`
- Simple EJS-based views for quick demos
- Seed script for sample data

## Tech stack

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv (configuration)
- morgan (logging)
- helmet (security headers)
- cors (CORS handling)

---

## Quick setup

Prerequisites:

- Node.js 18+ (or compatible)
- MongoDB (local `mongod` or MongoDB Atlas cluster)

Steps:

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/task-management-system.git
   cd task-management-system
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   - Create a `.env` in project root (copy from `.env.example` if present).
   - Required variables:
     ```text
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/taskdb
     ```
   - If using MongoDB Atlas, use the provided connection string with username/password.

4. (Optional) Seed sample data
   ```bash
   node data/seed.js
   ```

5. Start the server
   - Development (nodemon):
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm start
     ```

The server runs at: `http://localhost:3000`

---

## Project structure (key files)

Top-level files/folders in this repo:

```
./
├─ config/
│  └─ database.js          # Mongoose connection
├─ controllers/
│  ├─ employeeController.js
│  └─ taskController.js
├─ models/
│  ├─ Employee.js
│  └─ Task.js
├─ routes/
│  ├─ employees.js
│  └─ tasks.js
├─ data/
│  └─ seed.js              # Sample data inserter
├─ scripts/
│  └─ test-db.js           # Quick DB connection test script
├─ server.js               # App entry (Express setup)
├─ package.json
├─ .gitignore
└─ README.md
```

Files of interest:

- `config/database.js` — exports `connectDB()` that reads `process.env.MONGODB_URI` and connects via Mongoose.
- `data/seed.js` — clears and inserts two employees and three tasks (linked to employees).

---

## API Endpoints (examples)

Base URL: `http://localhost:3000/api`

Employees

- GET `/employees`
  - List all employees (200)

- POST `/employees`
  - Create a new employee
  - Body JSON: `{ "name": "Jane Smith", "role": "Manager", "email": "jane@example.com" }`

Tasks

- GET `/tasks` — list tasks
  - Supports query filters:
    - `?status=Pending`
    - `?employeeId=<employeeObjectId>`

- GET `/tasks/:id` — retrieve a single task (populates `employeeId`)

- POST `/tasks` — create task
  - Body JSON:
    ```json
    {
      "title": "New Task",
      "description": "Task details",
      "status": "Pending",
      "employeeId": "64f..."
    }
    ```

- PUT `/tasks/:id` — update task (e.g., `{"status":"Completed"}`)

- DELETE `/tasks/:id` — delete task

Example curl (create task):

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"desc","status":"Pending","employeeId":"<employeeId>"}'
```

---

## Validation and responses

- Validation uses `express-validator`. Validation failures return HTTP 400 with an `errors` array.
- Successful responses use `{ "success": true, "data": ... }`.
- Errors use `{ "success": false, "message": "..." }` (404 / 500 as appropriate).

---

## Troubleshooting & Notes

- If you get `connectDB is not a function` or `require('./config/database')` returns `{}`:
  - This can be caused by circular requires or requiring the module during initialization from another module. The repo's `config/database.js` assigns `module.exports = connectDB` — ensure that file is saved and not causing circular dependencies.

- If the server exits with code 1 when starting:
  - The DB connection likely failed. Check `MONGODB_URI` in your `.env` and test with `node ./scripts/test-db.js`.

---

## Testing using postman

<img width="1920" height="1020" alt="Screenshot 2025-11-30 123116" src="https://github.com/user-attachments/assets/c6c0f244-bd8a-410b-8bb8-bce75f9e85be" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 123118" src="https://github.com/user-attachments/assets/06e9da00-d6d3-4361-bed6-177e77c2b63e" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 123437" src="https://github.com/user-attachments/assets/8828eb79-1516-41a3-abb9-03742402c7ad" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 123438" src="https://github.com/user-attachments/assets/fec767ed-87a2-4730-83c4-58b3d45ca8d7" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 123611" src="https://github.com/user-attachments/assets/4050250a-6670-49c6-8eeb-2ef0479abec7" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 123839" src="https://github.com/user-attachments/assets/8388a403-0ea6-4ba5-afdb-71e069e6ea38" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 124358" src="https://github.com/user-attachments/assets/97989a8a-c6d6-4311-866b-ad7cb11f2e63" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 124359" src="https://github.com/user-attachments/assets/de0a21fe-1505-4672-ae8a-ed6f6028985d" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 124518" src="https://github.com/user-attachments/assets/b35c487a-6d1d-4129-a078-ffd54905b0a2" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 124638" src="https://github.com/user-attachments/assets/0728a6dc-d0f2-423b-8fd7-3630c28f87be" />

<img width="1920" height="1020" alt="Screenshot 2025-11-30 124743" src="https://github.com/user-attachments/assets/55613a2e-88e5-4ae7-a4d9-bd58d684245a" />
