// import createHttpError from 'http-errors';

// export const errorHandler = (err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }

//   if (err instanceof createHttpError.HttpError) {
//     return res.status(err.status).json({
//       status: err.status,
//       message: err.message,
//       data: err.data || {},
//     });
//   }

//   return res.status(500).json({
//     status: 500,
//     message: 'Internal Server Error',
//     data: { error: err.message },
//   });
// };

import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof createHttpError.HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.data || {},
    });
  }

  return res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    data: { error: err.message },
  });
};
