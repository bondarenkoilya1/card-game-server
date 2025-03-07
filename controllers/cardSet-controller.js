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

/* {
        "_id": "67c8990d051da8b0cd65a7a3",
        "cardSetName": "aside",
        "cards": [
            {
                "name": "Minus",
                "type": "range",
                "points": 4,
                "_id": "67c8990d051da8b0cd65a7a4"
            }
        ],
        "__v": 0
    }
 */
export const deleteCardSet = (request, response) => {
  CardSet.findByIdAndDelete(request.params.id)
    .then((cardSet) => {
      if (cardSet === null) {
        throw new Error("Operation was canceled. Card with this id was deleted recently");
      }

      const data = { message: "Card with this id was successfully deleted.", cardSet };
      handleSuccess(response, 200, data);
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
