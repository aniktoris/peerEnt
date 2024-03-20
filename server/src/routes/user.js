import express from "express";
import { createUser, getUsers } from "../controllers/user.js";
import { getUserById } from "../controllers/getUserById.js";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);

// Define the route for getting a user by ID
userRouter.get("/:userId", getUserById);

export default userRouter;
