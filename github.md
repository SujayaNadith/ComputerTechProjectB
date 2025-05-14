
# 🚀 Avenue School Web - Git Workflow Guide

## 📌 Purpose
This guide will help team members understand the Git workflow for our project. It ensures that all team members work on their own branches, and code is reviewed before being merged to the main branch.

---

## ⚡ Step 1: Clone the Repository (If Not Already Cloned)
```bash
git clone https://github.com/YourUsername/YourRepository.git
```

---

## ⚡ Step 2: Switch to Your Feature Branch
- Each team member has their own branch (e.g., `feature/jay`, `feature/dindi`).
- If the branch already exists:
  ```bash
  git checkout feature/your-username
  ```

- If you need to create your branch:
  ```bash
  git checkout -b feature/your-username
  git push -u origin feature/your-username
  ```

---

## ⚡ Step 3: Make Changes in Your Branch
- Make your changes to the code (React or Server).
- Save your work.

### ✅ Example Changes:
- Add a new component (e.g., Login.js)
- Fix a bug in the CSS
- Update a feature in the Server

---

## ⚡ Step 4: Stage and Commit Your Changes
```bash
git add .
git commit -m "Your clear and descriptive commit message"
```

- Use clear commit messages like:
  - "Implemented login form with validation"
  - "Fixed header CSS alignment"
  - "Created API endpoint for event creation"

---

## ⚡ Step 5: Push Your Changes to Your Feature Branch
```bash
git push origin feature/your-username
```

---

## ⚡ Step 6: Create a Pull Request (PR) to Development
1. Go to the GitHub Repository.
2. Go to the **"Pull Requests"** tab.
3. Click **"New Pull Request"**.
4. Set the **"Base Branch"** to `development`.
5. Set the **"Compare Branch"** to your feature branch (e.g., `feature/your-username`).
6. Add a title and description for your PR.
7. Click **"Create Pull Request"**.

---

## ⚡ Step 7: Request a Review
- In the PR page, request a team member to review your code.

### ✅ Reviewing Criteria:
- Code should be clean and well-commented.
- UI changes should be consistent with the design.
- No console errors or warnings.

---

## ⚡ Step 8: Once Approved, Merge into Development
- If your PR is approved, you can merge it into `development`.
- Make sure to use **"Squash and Merge"** for a clean history.

---

## ⚡ Step 9: Sync with Development Regularly
- Regularly sync your feature branch with the latest `development` to avoid conflicts:
  ```bash
  git checkout development
  git pull origin development
  git checkout feature/your-username
  git merge development
  ```

---

## ⚡ Step 10: Best Practices
- Never push directly to `main` or `development`.
- Always work in your feature branch.
- Always request a review for your PR.
- Keep your commits clear and descriptive.

---

## 📌 For Any Questions or Issues
- Contact the team lead or ask in the project chat.

