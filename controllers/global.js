export const handleSuccess = (response, statusCode, data) => response.status(statusCode).json(data);
export const handleError = (response, errorCode, error) =>
  response.status(errorCode).json({ error });

export const checkIsObjectEmpty = (object) => Object.keys(object).length === 0;
