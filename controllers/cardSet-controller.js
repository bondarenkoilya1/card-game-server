import { CardSet } from "../models";
import { checkIsObjectEmpty, handleError, handleSuccess } from "./global";
import { slugify } from "../utils";

export const getCardSets = (request, response) => {
  CardSet.find()
    .sort({ cardSetName: 1 })
    .then((cardSets) => handleSuccess(response, 200, cardSets))
    .catch((error) => handleError(response, 500, error.message));
};

/* request.params.name, where name is depending on what I
   specified in router function.
   For example: "/card-set/:name" */
// todo: rewrite comment. not so clear now
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
  const { cardSetName, cards } = request.body;
  const slug = slugify(cardSetName);

  const newCardSet = new CardSet({ cardSetName, slug, cards });

  newCardSet
    .save()
    .then(() => handleSuccess(response, 200, "Card set was successfully added."))
    .catch((error) => handleError(response, 500, error.message));
};

export const updateCardSet = (request, response) => {
  CardSet.findByIdAndUpdate(request.params.id, request.body)
    .then(() => {
      if (checkIsObjectEmpty(request.body)) {
        throw new Error("You didn't send any data. The card remains as it was");
      }

      handleSuccess(response, 200, "Card set with this id was successfully updated.");
    })
    .catch((error) => handleError(response, 500, error.message));
};
