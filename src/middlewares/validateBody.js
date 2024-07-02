// import createHttpError from 'http-errors';

// export const validateBody = (schema) => async (req, res, next) => {
//   try {
//     await schema.validateAsync(req.body, { abortEarly: false });
//     next();
//   } catch (err) {
//     const error = createHttpError(400, 'Bad Request', {
//       errors: err.details.map((detail) => detail.message),
//     });
//     next(error);
//   }
// };

import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    console.log('Validation error:', err.details); // Логирование ошибок валидации
    const errorDetails = err.details.map((detail) => ({
      message: detail.message,
      path: detail.path,
    }));
    const error = createHttpError(400, 'Bad Request', {
      errors: errorDetails,
    });
    next(error);
  }
};
