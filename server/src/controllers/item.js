import { Item, validateItem } from "../models/Item.js";
import { logError, logInfo } from "../util/logging.js";

export const getItems = async (req, res) => {
  try {
    // Get the page number from query parameters
    const page = parseInt(req.query.page) || 1;
    const pageSize = 12;
    const category = req.query.category;
    const title = req.query.title;

    //Calculate the skip value based on the page number
    const skip = (page - 1) * pageSize;

    // Define a filter object if category is chosen and only for active items
    const filter = { active: true };
    if (category) {
      filter.category = category;
    }
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    //Fetch items for the specified page with a limit of 9
    const items = await Item.find(filter).skip(skip).limit(pageSize);

    const totalCount = await Item.countDocuments(filter);

    res
      .status(200)
      .json({ success: true, result: items, totalItems: totalCount });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get items, try again later",
    });
  }
};

// Controller function to handle the creation of a new item
export const createItem = async (req, res) => {
  try {
    // Validate the request body
    const errors = validateItem(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Create a new item object based on the request body
    const newItem = new Item(req.body);

    // Save the new item to the database
    await newItem.save();

    // Log success message
    logInfo("New item created:", newItem);

    // Send a success response
    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      item: newItem,
    });
  } catch (error) {
    // Log error message
    logError("Error creating item:", error.message);

    // Send an error response
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
