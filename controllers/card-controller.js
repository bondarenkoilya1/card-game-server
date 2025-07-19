import { CardSet } from "../models/cardSet.js";
import { response } from "express";
import { handleError, handleSuccess } from "./global.js";

const findCardById = (cardId) => {
  const filterByCardId = { "cards._id": cardId };
  const returnOnlySpecifiedCard = { "cards.$": 1 };

  return CardSet.findOne(filterByCardId, returnOnlySpecifiedCard)
    .then((cardSet) => {
      if (!cardSet) {
        return handleError(response, 404, "Requested card was not found. Try another id");
      }

      return cardSet.cards[0];
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const getCard = async (request, response) => {
  findCardById(request.params.id)
    .then((card) => handleSuccess(response, 200, card))
    .catch((error) => handleError(response, 500, error.message));
};

export const updateCard = async (request, response) => {
  const specifiedCard = await findCardById(request.params.id);
  console.log(specifiedCard);
};

// ДЛЯ КАЖДОЙ КАРТЫ СВОЯ КНОПКА, НО ЕСЛИ ЗАМЕЧЕНО, ЧТО ИЗМЕНЕНИЯ БЫЛИ ЗАПИСАНЫ БОЛЕЕ, ЧЕМ В ДВУХ КАРТАХ, ТО ПОЯВЛЯЕТСЯ КНОПОЧКА ДЛЯ АПДЕЙТА ВСЕХ.
// PROMISE.ALL !!!!
