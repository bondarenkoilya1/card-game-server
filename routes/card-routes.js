import express from "express";
import { getCard } from "../controllers";

const router = express.Router();

router.get("/card/:id", getCard);

export { router as CardRoutes };
