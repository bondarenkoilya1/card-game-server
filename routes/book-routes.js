import express from "express";
import { getMovie, getMovies } from "../controllers";

const router = express.Router();

router.get("/card-sets", getMovies);
router.get("/cards/:id", getMovie);

export { router as BookRoutes };
