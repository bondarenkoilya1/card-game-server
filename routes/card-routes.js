import express from "express";
import { getCard } from "../controllers";

const router = express.Router();

router.get("/cards/:id", getCard);

export { router as CardRoutes };
