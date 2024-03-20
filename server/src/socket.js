import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import { logError, logInfo } from "./util/logging.js";
import formatMessage from "./util/formatMessage.js";
// import Message from "../models/Message.js"; // Import the Message model
import { createMessage, getMessagesByRoom } from "./controllers/message.js"; // Import the createMessage controller

dotenv.config();

const initializeSocketIO = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.BASE_CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    logInfo("A user has connected");

    // Handle joining a chat room
    socket.on("joinRoom", async (itemId) => {
      const roomName = `room-${itemId}`;
      socket.join(roomName); // Join the chat room
      logInfo(`A user has connected to room: ${roomName}`);

      // Retrieve old messages for the room
      try {
        const oldMessages = await getMessagesByRoom(roomName);
        // Emit old messages to the user who just joined
        socket.emit("oldMessages", oldMessages);
      } catch (error) {
        logError("Error retrieving old messages:", error);
        // Handle the error as needed
      }
    });

    // Handle chat messages
    socket.on("chat message", async (message) => {
      logInfo("Received chat message:", message.text);

      // Format the message
      const formattedMessage = formatMessage(
        message.userName,
        message.text,
        message.pic,
        message.room
      );
      logInfo("Formatted message:", formattedMessage);

      // Save the message to the database
      try {
        const savedMessage = await createMessage(formattedMessage);
        logInfo("Message saved to database:", savedMessage);
      } catch (error) {
        logError("Error saving message:", error);
      }
      // Broadcast the formatted message to all users in the room
      io.to(message.room).emit("chat message", formattedMessage);
      logInfo(`Broadcasted message to room: ${message.room}`);

      // Emit a notification event to the client
      io.emit("notification", message.room);
    });

    // Handle disconnects
    socket.on("disconnect", () => {
      logInfo("A user has disconnected");
      // Handle user disconnect
    });
  });

  return io;
};

export default initializeSocketIO;
