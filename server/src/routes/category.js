import express from "express";
import { getCategories } from "../controllers/category.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);

export default categoryRouter;
