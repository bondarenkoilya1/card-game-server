import express from "express";
import {
  addCardSet,
  deleteCardSet,
  getCardSet,
  getCardSets,
  updateCardSet
} from "../controllers/cardSet-controller";

const router = express.Router();

router.get("/card-sets", getCardSets);
router.get("/card-sets/:id", getCardSet);
router.post("/card-sets", addCardSet);
router.delete("/card-sets/:id", deleteCardSet);
router.patch("/card-sets/:id", updateCardSet);

export { router as CardSetRoutes };
