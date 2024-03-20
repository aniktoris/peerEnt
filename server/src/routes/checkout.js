import express from "express";
import { createCheckout } from "../controllers/checkout.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/create-checkout-session", createCheckout);

export default checkoutRouter;
