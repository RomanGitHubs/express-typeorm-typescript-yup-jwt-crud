interface CustomError extends Error {
  status?: number;
}

const generateError = (message, status) => {
  const error: CustomError = new Error(message)
  error.status = status;
  return error
}

export default generateError;
