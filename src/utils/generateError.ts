interface CustomError extends Error {
  status?: number;
  text?: string;
}

const generateError = (message, status) => {
  const error: CustomError = new Error(message);

  error.status = status;
  error.text = message;
  return error;
};

export default generateError;
