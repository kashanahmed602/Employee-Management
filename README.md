# Employee Management System

A full-stack Employee Management System built with the MERN Stack (MongoDB, Express.js, React.js, Node.js). This application allows administrators to manage employees, assign tasks, create teams, and monitor task progress, while employees can view and update their assigned tasks.

---

## Features

### Admin Panel

- Secure Admin Login (JWT Authentication)
- Add New Employees
- View All Employees
- Create Individual Tasks
- Create Team Tasks
- Create Teams
- Edit Teams
- Delete Teams
- Assign Tasks to Employees
- Assign Tasks to Teams
- Dashboard Overview
- Task Status Tracking

### Employee Panel

- Secure Employee Login
- View Personal Tasks
- View Team Tasks
- Accept Assigned Tasks
- Complete Tasks
- Mark Tasks as Failed
- View Team Members
- Track Task Progress

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

## Folder Structure

```
Employee-Management-System
│
├── client
│   ├── src
│   ├── Components
│   ├── Pages
│   ├── Dashboard
│   ├── Context
│   └── App.jsx
│
├── server
│   ├── Controllers
│   ├── Models
│   ├── Routes
│   ├── Middleware
│   ├── Config
│   └── Server.js
│
└── README.md
```

---

## Authentication

- JWT Token Authentication
- Password Encryption using bcrypt
- Protected Routes
- Role Based Login
  - Admin
  - Employee

---

## Database Collections

### Users

```
- Name
- Email
- Password
- Role
```

### Tasks

```
- Title
- Description
- Assign Type
- Assigned Employee / Team
- Category
- Due Date
- Status
```

### Teams

```
- Team Name
- Members
- Employee ID
- Name
- Email
```

---

## Project Workflow

### Admin

```
Login
      ↓
Dashboard
      ↓
Add Employee
      ↓
Create Team
      ↓
Assign Task
      ↓
Employee Receives Task
```

### Employee

```
Login
      ↓
Dashboard
      ↓
View Tasks
      ↓
Accept Task
      ↓
Complete / Fail Task
```

---

## API Endpoints

### Authentication

```
POST    /api/v1/auth/login
POST    /api/v1/auth/register
```

### Employee

```
GET     /api/v1/employee
```

### Tasks

```
POST    /api/v1/createTask
GET     /api/v1/allTask
PUT     /api/v1/updateTask/:id
DELETE  /api/v1/deleteTask/:id
```

### Teams

```
POST    /api/v1/createTeam
GET     /api/v1/getTeam
PUT     /api/v1/updateTeam/:id
DELETE  /api/v1/deleteTeam/:id
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/employee-management-system.git
```

### Install Frontend

```bash
cd client
npm install
```

### Install Backend

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run Frontend

```bash
npm run dev
```

---

## Run Backend

```bash
npm run dev
```

---

## Future Improvements

- Notifications
- Email Verification
- File Uploads
- Attendance System
- Leave Management
- Charts & Analytics
- Search & Filters
- Pagination

---

## Author

**Kashan Ahmed**

BS Computer Science Student

MERN Stack Developer

---

## License

This project is developed for learning purposes.