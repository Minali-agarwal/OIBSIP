import express from "express";
import bcrypt from "bcrypt";
import fs from "fs";

const router = express.Router();
const FILE = "./users.json";

// Read Users
function getUsers() {
  if (!fs.existsSync(FILE)) {
    return [];
  }

  const data = fs.readFileSync(FILE);

  return JSON.parse(data);
}

// Save Users
function saveUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

// ================= REGISTER =================

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Empty Validation
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Password Validation
  const passwordRegex = /^(?=.*\d).{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters and contain one number",
    });
  }

  let users = getUsers();

  // Duplicate Check
  const existingUser = users.find(
    (user) =>
      user.username === username ||
      user.email === email
  );

  if (existingUser) {
    return res.status(400).json({
      message: "Username or Email already exists",
    });
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    username,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  saveUsers(users);

  res.json({
    message: "Registration Successful",
  });
});

// ================= LOGIN =================

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const users = getUsers();

  const user = users.find(
    (u) =>
      u.username === username ||
      u.email === username
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  req.session.user = user;

  res.json({
    message: "Login Successful",
  });
});

// ================= LOGOUT =================

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({
      message: "Logged Out",
    });
  });
});

export default router;