import { CardSet } from "../models";

const handleSuccess = (response, statusCode, data) => response.status(statusCode).json(data);
const handleError = (response, errorCode, error) => response.status(errorCode).json({ error });

// Decide where I should return object in response and where not

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

/* Kinda don't understand why I return cardSet here,
   decide later, when will call from front-end */
export const updateCardSet = (request, response) => {
  const checkIsObjectEmpty = (object) => Object.keys(object).length === 0;

  CardSet.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then(() => {
      if (checkIsObjectEmpty(request.body)) {
        throw new Error("You didn't send any data. The card remains as it was");
      }

      handleSuccess(response, 200, "Card set with this id was successfully updated.");
    })
    .catch((error) => handleError(response, 500, error.message));
};

/* Bring out to a separate file. [cardSet-controller.js, card-controller.js]
   For each there will be similar routes such as delete, post, patch */
export const getCard = (request, response) => {
  const filterByCardId = { "cards._id": request.params.id };
  const returnOnlyRequiredCard = { "cards.$": 1 };

  CardSet.findOne(filterByCardId, returnOnlyRequiredCard)
    .then((cardSet) => {
      if (!cardSet) {
        return handleError(response, 404, "Requested card was not found. Try another id");
      }

      handleSuccess(response, 200, cardSet.cards[0]);
    })
    .catch((error) => handleError(response, 500, error.message));
};
