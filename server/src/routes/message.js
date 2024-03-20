// routes/message.js

import express from "express";
import {
  createMessage,
  getMessagesByRoom,
  deleteAllmessages,
} from "../controllers/message.js";

const messageRouter = express.Router();

// Route to create a new message
messageRouter.post("/", createMessage);

// Route to get all messages for a room
messageRouter.get("/:room", getMessagesByRoom);

// Route to delete all messages
messageRouter.delete("/delete", deleteAllmessages);

export default messageRouter;
