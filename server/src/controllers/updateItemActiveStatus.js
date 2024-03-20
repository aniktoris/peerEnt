import { Item } from "../models/Item.js";
import { logError } from "../util/logging.js";

export const updateItemActiveStatus = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, error: "Item ID is required" });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    item.active = !item.active;
    await item.save();
    res.status(200).json({ success: true, result: item });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
