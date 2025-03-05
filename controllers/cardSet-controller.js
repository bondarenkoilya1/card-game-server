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

// export const getCard = (request, response) =>
//   CardSet.findById(request.params.id)
//     .then((book) => response.status(200).json(book))
//     .catch((error) => handleError(response, 500, error.message));

// const newCardSet = new CardSet({
//   cardSetName: "bush",
//   cards: [
//     {
//       id: crypto.randomUUID(),
//       name: "Mainu",
//       type: "range",
//       points: 4
//     }
//   ]
// });

// newCardSet
//   .save()
//   .then(() => console.log("CardSet saved successfully"))
//   .catch((error) => console.error("Error saving CardSet:", error.message));
