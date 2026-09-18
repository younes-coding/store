export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const isProd = process.env.NODE_ENV === 'production';

  const userMessage = (isProd && statusCode === 500)
    ? 'حدث خطأ في معالجة طلبك، يرجى المحاولة بعد قليل'
    : (err.message || 'حدث خطأ غير متوقع');

  res.status(statusCode).json({
    success: false,
    message: userMessage,
    stack: isProd ? null : err.stack
  });
};
