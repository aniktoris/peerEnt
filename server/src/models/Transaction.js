import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const transactionSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "items",
    required: true,
  },
  renter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  borrower_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Transaction = mongoose.model("transactions", transactionSchema);

export const validateTransaction = (transactionObject) => {
  const errorList = [];
  const allowedKeys = [
    "startDate",
    "endDate",
    "totalPrice",
    "item_id",
    "renter_id",
    "borrower_id",
  ];

  const validatedKeysMessage = validateAllowedFields(
    transactionObject,
    allowedKeys
  );

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (transactionObject.startDate == null) {
    errorList.push("startDate is a required field");
  }

  if (transactionObject.endDate == null) {
    errorList.push("endDate is a required field");
  }

  if (transactionObject.totalPrice == null) {
    errorList.push("totalPrice is a required field");
  } else if (
    isNaN(transactionObject.totalPrice) ||
    transactionObject.totalPrice <= 0
  ) {
    errorList.push("totalPrice must be a positive number");
  }

  if (transactionObject.item_id == null) {
    errorList.push("item_id is a required field");
  }

  if (transactionObject.renter_id == null) {
    errorList.push("renter_id is a required field");
  }

  if (transactionObject.borrower_id == null) {
    errorList.push("borrower_id is a required field");
  }

  return errorList;
};

export default Transaction;
