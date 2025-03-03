import express from "express";
import { Book } from "../models";

const router = express.Router();

const handleError = (response, errorCode, error) => {
  response.status(errorCode).json({ error });
};

router.get("/card-sets", (request, response) =>
  Book.find()
    .sort({ title: 1 })
    .then((books) => response.status(200).json(books))
    .catch((error) => handleError(response, 500, error.message))
);

router.get("/cards/:id", (request, response) =>
  Book.findById(request.params.id)
    .then((book) => response.status(200).json(book))
    .catch((error) => handleError(response, 500, error.message))
);

export { router as BookRoutes };
