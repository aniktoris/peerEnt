import express from "express";
import { getItems, createItem } from "../controllers/item.js";
import { getItemAndUserDataById } from "../controllers/getItemAndUserDataById.js";
import { updateItemActiveStatus } from "../controllers/updateItemActiveStatus.js";

const itemRouter = express.Router();

// Handle GET requests to retrieve items
itemRouter.get("/", getItems);

// Handle POST requests to create a new item
itemRouter.post("/", createItem);

// Handle GET requests to retrieve a single item by its ID
itemRouter.get("/:itemId", getItemAndUserDataById);

itemRouter.patch("/:itemId", updateItemActiveStatus);

export default itemRouter;
