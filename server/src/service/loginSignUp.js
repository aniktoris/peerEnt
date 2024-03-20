import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { logError } from "../util/logging.js";

const createUser = async (userData) => {
  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Check if a user with the same username already exists
    const existingUsername = await User.findOne({
      username: userData.username,
    });

    if (existingUsername) {
      throw new Error("User with this username already exists");
    }

    // No duplicate email, proceed to create a new user
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    logError(
      `Error creating user ${userData.username} with email ${userData.email}: ${error.message}`
    );
    throw error;
  }
};

const findUserByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (user && (await user.comparePassword(password))) {
    return user;
  }
  return null;
};

const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

export { createUser, findUserByCredentials, generateAuthToken };
