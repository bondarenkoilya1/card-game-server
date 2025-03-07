import express from "express";
import { deleteCardSet, getCard, getCardSet, getCardSets, addCardSet } from "../controllers";

const router = express.Router();

router.get("/card-sets", getCardSets);
router.get("/card-set/:name", getCardSet);
router.post("/card-set", addCardSet);
router.delete("/card-set/:id", deleteCardSet);

// bring out to a separate file (card-routes)
router.get("/card/:id", getCard);

export { router as CardSetRoutes };
