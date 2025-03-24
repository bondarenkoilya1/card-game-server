import express from "express";
import { deleteCardSet, getCardSet, getCardSets, addCardSet, updateCardSet } from "../controllers";

const router = express.Router();

router.get("/card-sets", getCardSets);
router.get("/card-set/:id", getCardSet);
router.post("/card-set", addCardSet);
router.delete("/card-set/:id", deleteCardSet);
router.patch("/card-set/:id", updateCardSet);

export { router as CardSetRoutes };
