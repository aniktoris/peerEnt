import dotenv from "dotenv";
import { logInfo, logError } from "../util/logging.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

const images = [
  "../../assets/categories/sound-and-vision.png",
  "../../assets/categories/gaming.png",
  "../../assets/categories/transport.png",
  "../../assets/categories/computers.png",
  "../../assets/categories/care.png",
  "../../assets/categories/clothes.png",
  "../../assets/categories/tools.png",
  "../../assets/categories/kitchen.png",
  "../../assets/categories/household.png",
  "../../assets/categories/sports-and-leisure.png",
  "../../assets/categories/party-and-event.png",
  "../../assets/categories/pets.png",
];

(async function run() {
  try {
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image);
      logInfo(result.url);
    }
  } catch (error) {
    logError(`Error uploading image: ${error.message}`);
  }
})();
