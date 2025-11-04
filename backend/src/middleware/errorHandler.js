export function notFoundHandler(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const payload = {
    message: err.message || 'Internal server error',
  };

  if (req.app.get('env') === 'development' && err.stack) {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
  next();
}
