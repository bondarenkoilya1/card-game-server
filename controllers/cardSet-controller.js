import { CardSet } from "../models";
import { handleError, handleSuccess } from "./global";

export const getCardSets = (request, response) => {
  CardSet.find()
    .sort({ cardSetName: 1 })
    .then((cardSets) => handleSuccess(response, 200, cardSets))
    .catch((error) => handleError(response, 500, error.message));
};

/* request.params.name, where name is depending on what I
   specified in router function.
   For example: "/card-set/:name" */
export const getCardSet = (request, response) => {
  CardSet.findById(request.params.id)
    .then((cardSet) => {
      if (cardSet === null) {
        throw new Error(
          "Card set with such id was not found. Note, that you have to specify exactly a card set id, not a name or something else"
        );
      }

      handleSuccess(response, 200, cardSet);
    })
    .catch((error) => handleError(response, 500, error.message));
};

export const deleteCardSet = (request, response) => {
  CardSet.findByIdAndDelete(request.params.id)
    .then((cardSet) => {
      if (cardSet === null) {
        throw new Error("Operation was canceled. Card with this id was deleted recently");
      }

      handleSuccess(response, 200, "Card with this id was successfully deleted.");
    })
    .catch((error) => handleError(response, 500, error.message));
};

export const addCardSet = (request, response) => {
  const newCardSet = new CardSet(request.body);

  newCardSet
    .save()
    .then(() => handleSuccess(response, 200, "Card set was successfully added."))
    .catch((error) => handleError(response, 500, error.message));
};

export const updateCardSet = (request, response) => {
  const checkIsObjectEmpty = (object) => Object.keys(object).length === 0;

  CardSet.findByIdAndUpdate(request.params.id, request.body)
    .then(() => {
      if (checkIsObjectEmpty(request.body)) {
        throw new Error("You didn't send any data. The card remains as it was");
      }

      handleSuccess(response, 200, "Card set with this id was successfully updated.");
    })
    .catch((error) => handleError(response, 500, error.message));
};
