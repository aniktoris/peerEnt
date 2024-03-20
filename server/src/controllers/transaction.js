import Transaction from "../models/Transaction.js";
import { Item } from "../models/Item.js";
import { logError, logInfo } from "../util/logging.js";

export const createTransaction = async (req, res) => {
  try {
    const { startDate, endDate, price, renterId, borrowerId } = req.body;
    const { itemId } = req.params;
    logInfo(req.body);

    const transaction = new Transaction({
      startDate,
      endDate,
      totalPrice: price,
      item_id: itemId,
      renter_id: renterId,
      borrower_id: borrowerId,
    });

    await transaction.save();
    res.status(201).json({ success: true, result: transaction });
  } catch (error) {
    logError("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};

export const getUnavailableDates = async (req, res) => {
  try {
    const { itemId } = req.params;
    // to find all the transactions for this item-id
    const existingTransactions = await Transaction.find({ item_id: itemId });
    const unavailableDates = [];
    existingTransactions.forEach((transaction) => {
      const { startDate, endDate } = transaction;
      const daysBetween = getDatesBetween(startDate, endDate);
      if (!unavailableDates.includes(startDate)) {
        unavailableDates.push(startDate);
      }
      daysBetween.forEach((date) => {
        if (!unavailableDates.includes(date)) {
          unavailableDates.push(date);
        }
      });
      if (!unavailableDates.includes(endDate)) {
        unavailableDates.push(endDate);
      }
    });
    res.status(200).json({ success: true, result: unavailableDates });
  } catch (error) {
    logError("Error retrieving unavailable dates:", error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};
function getDatesBetween(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

// Function to retrieve transactions associated with a specific user
export const getUserTransactions = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const { userId } = req.params;

    // Find transactions where the user is either the renter or borrower
    const userTransactions = await Transaction.find({
      $or: [{ renter_id: userId }, { borrower_id: userId }],
    });

    // Separate transactions into rented and borrowed items
    const rentedItems = [];
    const borrowedItems = [];
    const listedItemIds = []; // Array to store IDs of items listed by the user

    userTransactions.forEach((transaction) => {
      // Convert ObjectId to string for comparison
      const transactionRenterIdString = transaction.renter_id.toString();

      if (transactionRenterIdString === userId) {
        rentedItems.push(transaction);
      } else {
        borrowedItems.push(transaction);
      }
    });

    // Extract item IDs from rented and borrowed transactions
    const rentedItemIds = rentedItems.map((transaction) => transaction.item_id);
    const borrowedItemIds = borrowedItems.map(
      (transaction) => transaction.item_id
    );

    // Fetch corresponding items from the database
    const rentedItemsData = await Item.find({ _id: { $in: rentedItemIds } });
    const borrowedItemsData = await Item.find({
      _id: { $in: borrowedItemIds },
    });

    // Find all items listed by the user
    const allUserItems = await Item.find({ renter_id: userId });
    allUserItems.forEach((item) => {
      // If the item ID is not in the rented or borrowed item IDs, add it to the listed items
      if (
        !rentedItemIds.includes(item._id) &&
        !borrowedItemIds.includes(item._id)
      ) {
        listedItemIds.push(item._id);
      }
    });

    // Fetch corresponding listed items from the database with the active status
    const listedItemsData = await Item.find({
      _id: { $in: listedItemIds },
    });

    // Send the user's rented, borrowed, and listed items as separate arrays in the response
    res.status(200).json({
      success: true,
      rentedItems: rentedItemsData,
      borrowedItems: borrowedItemsData,
      listedItems: listedItemsData,
    });
  } catch (error) {
    // Log and handle errors
    logError("Error retrieving user transactions:", error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
};

export default {
  createTransaction,
  getUnavailableDates,
  getUserTransactions,
};
