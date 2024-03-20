import express from "express";
import {
  createTransaction,
  getUnavailableDates,
  getUserTransactions,
} from "../controllers/transaction.js";

const transactionRouter = express.Router();

transactionRouter.post("/rentPage/:itemId", createTransaction);
transactionRouter.get("/rentPage/:itemId", getUnavailableDates);
transactionRouter.get("/:userId", getUserTransactions);

export default transactionRouter;
