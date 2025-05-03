import { z } from "zod";

const validate = (schema, source) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req[source]);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: `Invalid ${source} schema`,
          errors: err.errors,
        });
      } else {
        next(err);
      }
    }
  };
};

const validateRequestBody = (schema) => {
  return validate(schema, "body");
};

const validateRequestParams = (schema) => {
  return validate(schema, "params");
};

const validateRequestQuery = (schema) => {
  return validate(schema, "query");
};

export { validateRequestBody, validateRequestParams, validateRequestQuery };
