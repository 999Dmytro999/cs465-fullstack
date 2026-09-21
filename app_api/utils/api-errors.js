const logApiError = (context, err) => {
  console.error(`[API] ${context}:`, err);
};

const sendClientError = (res, status, message, err, context) => {
  if (err) {
    logApiError(context, err);
  }

  return res.status(status).json({ message: message });
};

const sendInternalError = (res, message, err, context) => {
  logApiError(context, err);
  return res.status(500).json({ message: message });
};

const apiErrorHandler = (err, req, res, next) => {
  logApiError(`${req.method} ${req.originalUrl}`, err);

  const status = Number.isInteger(err.status) && err.status >= 400 && err.status < 500
    ? err.status
    : 500;
  const message = status === 400 ? 'Invalid request.' : 'The API request could not be completed.';

  return res.status(status).json({ message: message });
};

module.exports = {
  apiErrorHandler,
  sendClientError,
  sendInternalError
};
