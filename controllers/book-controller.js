import { Book } from "../models";

const handleError = (response, errorCode, error) => response.status(errorCode).json({ error });

export const getMovies = (request, response) =>
  Book.find()
    .sort({ title: 1 })
    .then((books) => response.status(200).json(books))
    .catch((error) => handleError(response, 500, error.message));

export const getMovie = (request, response) =>
  Book.findById(request.params.id)
    .then((book) => response.status(200).json(book))
    .catch((error) => handleError(response, 500, error.message));
