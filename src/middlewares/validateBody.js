import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createHttpError(400, error.message));
    }
    next();
  };
  return fn;
};
