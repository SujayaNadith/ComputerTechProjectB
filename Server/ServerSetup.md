
# 🚀 Avenue School Web - Server Setup

## 📌 Project Overview
This is the backend server for the Avenue School Web project, built using Node.js and Express. This server provides APIs for events, user accounts, and other features required by the school website.

---

## ⚡ Step 1: Prerequisites
- Ensure you have **Node.js (LTS)** installed. Verify using:
  ```bash
  node -v
  npm -v
  ```
- Ensure you have **Git** installed:
  ```bash
  git --version
  ```

---

## ⚡ Step 2: Cloning the Repository
1. **Clone the Project Repository (Frontend + Backend)**
   ```bash
   git clone https://github.com/Dindi05/Computer-Technology-Design-Projects-AB
   ```

2. **Navigate to the Server Directory**
   ```bash
   cd avenue-school-web/Server
   ```

---

## ⚡ Step 3: Install Dependencies
- Install the required Node.js packages:
  ```bash
  npm install
  ```

---

## ⚡ Step 4: Environment Configuration
1. **Create a `.env` File in the Server Directory**
   ```bash
   touch .env
   ```

2. **Add the Following Environment Variables:**
   ```
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string-here
   JWT_SECRET=your-jwt-secret-key
   ```

---

## ⚡ Step 5: Running the Server
- Start the server in development mode:
  ```bash
  npm run dev
  ```

- For production:
  ```bash
  npm start
  ```

- The server should be running at:
  ```
  http://localhost:5000
  ```

---

## ⚡ Step 6: API Structure (Basic)
- `GET /api/events` - Fetch all events
- `POST /api/events` - Create a new event (Admin only)
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user

---

## ⚡ Step 7: Troubleshooting
- If you encounter any issues with missing modules:
  ```bash
  npm install
  ```

- If the server does not start, ensure your `.env` file is correctly configured.

- If you see "PORT already in use", change the port in the `.env` file.

---

## ⚡ Step 8: Contributing
- Ensure you pull the latest changes before starting work:
  ```bash
  git pull origin main
  ```

- Always use a new branch for new features:
  ```bash
  git checkout -b feature/your-feature-name
  ```

- Make sure to follow the project coding standards.

---

## ⚡ Step 9: Project Structure
```
Server/
├── config/             # Configuration files (DB, JWT)
├── controllers/        # API Logic (Controllers)
├── middleware/         # Authentication and Error Handling
├── models/             # Database Models (Mongoose)
├── routes/             # API Routes (Events, Users)
├── server.js           # Main Server File
└── package.json        # Server Dependencies
```
