import { CardSet } from "../models";
import { handleError, handleSuccess } from "./global";

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
