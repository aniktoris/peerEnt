import mongoose from "mongoose";
import { logError, logInfo } from "../util/logging.js";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

const Category = mongoose.model("categories", categorySchema);

const initializeCategories = async () => {
  try {
    const count = await Category.countDocuments({});
    if (count === 0) {
      const initialCategories = [
        {
          name: "Sound & Vision",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140655/rqj8wjrudubgkx1wvwny.png",
        },
        {
          name: "Gaming",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140656/ljt0duqkqno2lduupnvw.png",
        },
        {
          name: "Transport",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140657/il8agtuc9dvmz9cnra82.png",
        },
        {
          name: "Computers",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140658/ht5qzlwbq3klsruoktrk.png",
        },
        {
          name: "Care",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140660/smrrxhmsisxui4fmktzb.png",
        },
        {
          name: "Clothing",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140661/s4kxbcd0xtnpsuvjtc0w.png",
        },
        {
          name: "Tool",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140662/qsgylersdnvafwcrbnlm.png",
        },
        {
          name: "Kitchen",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140663/pmziowefixjxnl8v0fz4.png",
        },
        {
          name: "Household",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140664/dzzr2mw9uwrq19cy0odn.png",
        },
        {
          name: "Sports & Leisure",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140665/xbnqkrduqfnziiekwb9b.png",
        },
        {
          name: "Party & Event",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140666/eqzbbzk0yno0zzkevozg.png",
        },
        {
          name: "Pets",
          icon: "http://res.cloudinary.com/dibnqoge8/image/upload/v1707140667/bspwb5w1keolz2qnkxr9.png",
        },
      ];

      await Category.insertMany(initialCategories);
      logInfo("Initial categories inserted successfully");
    } else {
      logInfo("Categories already exist");
    }
  } catch (error) {
    logError(error);
  }
};

export { Category, initializeCategories };
