interface ExtendedError extends Error {
  status?: number;
  text?: string;
}

export const catchError = (err: ExtendedError, req, res, next) => {
  res.status(err.status ?? 500).json({ message: err.text, status: err.status });
};
