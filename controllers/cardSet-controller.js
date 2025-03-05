import { CardSet } from "../models";

const handleSuccess = (response, statusCode, data) => response.status(statusCode).json(data);
const handleError = (response, errorCode, error) => response.status(errorCode).json({ error });

export const getCardSets = (request, response) =>
  CardSet.find()
    .sort({ cardSetName: 1 })
    .then((cardSets) => handleSuccess(response, 200, cardSets))
    .catch((error) => handleError(response, 500, error.message));

/* request.params.name, where name is depending on what I
   specified in router function.
   For example: "/card-set/:name" */
export const getCardSet = (request, response) => {
  CardSet.findOne({ cardSetName: request.params.name })
    .then((cardSet) => handleSuccess(response, 200, cardSet))
    .catch((error) => handleError(response, 500, error.message));
};

export const getCard = (request, response) => {
  const filterByCardId = { "cards._id": request.params.id };
  const returnOnlyRequiredCard = { "cards.$": 1 };

  CardSet.findOne(filterByCardId, returnOnlyRequiredCard)
    .then((cardSet) => {
      if (!cardSet)
        return handleError(response, 404, "Requested card was not found. Try another id");
      handleSuccess(response, 200, cardSet.cards[0]);
    })
    .catch((error) => handleError(response, 500, error.message));
};

// const newCardSet = new CardSet({
//   cardSetName: "maths",
//   cards: [
//     {
//       name: "Minus",
//       type: "range",
//       points: 4
//     }
//   ]
// });
//
// newCardSet
//   .save()
//   .then(() => console.log("CardSet saved successfully"))
//   .catch((error) => console.error("Error saving CardSet:", error.message));

// TODO: Add routes to add new cards, delete and update
