import express from "express";
import { getCard, getCardSet, getCardSets } from "../controllers";

const router = express.Router();

router.get("/card-sets", getCardSets);
router.get("/card-set/:name", getCardSet);
// router.get("/card/:id", getCard);

export { router as CardSetRoutes };
