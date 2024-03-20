import express from "express";
import http from "http";
import initializeSocketIO from "./socket.js";
import cors from "cors";
import itemRouter from "./routes/item.js";
import userRouter from "./routes/user.js";
import categoryRouter from "./routes/category.js";
import router from "./routes/authRoutes.js";
import userInfoRouter from "./routes/userRoute.js";
import expenseRouter from "./routes/expense.js";
import transactionRouter from "./routes/transaction.js";
import checkoutRouter from "./routes/checkout.js";
import messageRouter from "./routes/message.js";

// Create an express server
const app = express();
const server = http.createServer(app);

const io = initializeSocketIO(server);
app.io = io;

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/auth", router);
app.use("/api/category", categoryRouter);
app.use("/api/item", itemRouter);
app.use("/api", userInfoRouter);
app.use("/api/user", userInfoRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/message", messageRouter);

export { app, server };
