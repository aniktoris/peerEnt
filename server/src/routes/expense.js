import express from "express";
import { Item } from "../models/Item.js";

const expenseRouter = express.Router();

expenseRouter.get("/rentPage/:itemId", async (req, res) => {
  try {
    // Destructuring
    const { itemId } = req.params;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    const depositRequired = item.deposit > 0;

    //  total cost would be the item's price plus deposit if required
    const price = item.price;
    const renterId = item.renter_id;

    const response = {
      price: price.toFixed(2), // total expense as string without Euro symbol
      depositRequired,
      depositAmount: depositRequired
        ? item.deposit.toFixed(2)
        : "No deposit required",
      renterId: renterId,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default expenseRouter;
