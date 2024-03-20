import User from "../models/User.js";
import { logError } from "../util/logging.js";

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, result: user });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
