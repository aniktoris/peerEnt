import express from "express";
import {
  createUser,
  findUserByCredentials,
  generateAuthToken,
} from "../service/loginSignUp.js";

const router = express.Router();

//Sign-Up Handler
const handleSignUp = async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);
    if (!user) {
      return res.status(400).json({ message: "Failed to create user" });
    }
    const token = generateAuthToken(user._id);
    res.status(201).send({ token });
  } catch (err) {
    if (err.message === "User with this email already exists") {
      return res.status(400).json({ message: "This email already exists" });
    } else if (err.message === "User with this username already exists") {
      return res
        .status(400)
        .json({ message: "This username is already taken" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login.jsx Handler
const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByCredentials(username, password);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }
    const token = generateAuthToken(user._id);
    res.send({ token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// Routes
router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
export default router;
