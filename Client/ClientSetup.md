
# 🚀 Avenue School Web - Client Setup (React)

## 📌 Project Overview
This is the frontend client for the Avenue School Web project, built using React and styled with Bootstrap. This client provides a user-friendly interface for school users, including students, parents, teachers, and admin.

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

2. **Navigate to the Client Directory**
   ```bash
   cd avenue-school-web/Client
   ```

---

## ⚡ Step 3: Install Dependencies
- Install the required React packages:
  ```bash
  npm install
  ```

- Key Dependencies:
  - **React (Core)** - `npm install react react-dom`
  - **React Router DOM (Routing)** - `npm install react-router-dom`
  - **Bootstrap (Styling)** - `npm install bootstrap react-bootstrap`
  - **Axios (API Calls)** - `npm install axios`
  - **Framer Motion (Animations)** - `npm install framer-motion`
  - **React Icons (Icons)** - `npm install react-icons`
  - **Moment.js (Date Management)** - `npm install moment`
  - **React Context API (State Management)** (Already integrated)

---

## ⚡ Step 4: Running the Client
- Start the React client in development mode:
  ```bash
  npm start
  ```

- The client should be running at:
  ```
  http://localhost:3000
  ```

- For production build:
  ```bash
  npm run build
  ```

---

## ⚡ Step 5: Project Structure
```
Client/
├── public/               # Static files (Logo, Favicon)
├── src/                  # React Source Code
│   ├── assets/           # Images and other static assets
│   ├── components/       # Reusable React Components (Header, Footer, etc.)
│   ├── context/          # React Context (Global State)
│   ├── pages/            # Individual Pages (Home, About, Events, etc.)
│   ├── styles/           # CSS/SCSS Files (themes.css, overrides.css)
│   ├── App.js            # Main React Component
│   └── index.js          # React Entry Point
├── package.json          # React Dependencies and Scripts
└── .gitignore            # Ignoring node_modules and other local files
```

---

## ⚡ Step 6: Environment Configuration (Optional)
- Create a `.env` file for environment variables (API URLs):
  ```bash
  touch .env
  ```

- Example Variables:
  ```
  REACT_APP_API_URL=http://localhost:5000/api
  ```

---

## ⚡ Step 7: Troubleshooting
- If you encounter any issues with missing modules:
  ```bash
  npm install
  ```

- If the client does not start, ensure your `package.json` is not corrupted.

- If CSS is not loading properly, ensure Bootstrap is correctly imported in `index.js`:
  ```javascript
  import 'bootstrap/dist/css/bootstrap.min.css';
  ```

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
