import { Item } from "../models/Item.js";
import { logError } from "../util/logging.js";
import mongoose from "mongoose";
// Controller function to fetch a single item by its ID along with associated user data
export const getItemAndUserDataById = async (req, res) => {
  try {
    // Extract the item ID from the request parameters
    const itemId = req.params.itemId;
    // Add a check to ensure itemId is defined
    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, error: "Item ID is required" });
    }

    // Aggregate query to fetch the item and its associated user data
    const result = await Item.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(itemId) },
      },
      {
        $lookup: {
          from: "users", //User collection
          localField: "renter_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          category: 1,
          imageURL: 1,
          price: 1,
          deposit: 1,
          active: 1,
          renter_id: 1,
          category_id: 1,
          user: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            username: 1,
            email: 1,
            city: 1,
            userImageURL: 1,
          },
        },
      },
    ]);

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    res.status(200).json({ success: true, result: result[0] });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
