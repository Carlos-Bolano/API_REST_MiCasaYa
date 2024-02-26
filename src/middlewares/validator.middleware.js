export const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      // validate the request body against the schema
      await schema.validateAsync(req.body, { abortEarly: false });
      // validate if files have no more than 4 files
      if (req.files && Object.keys(req.files).length > 4) {
        return res
          .status(400)
          .json({ general: "No se pueden proporcionar más de 4 imágenes" });
      }
      next();
    } catch (error) {
      const errors = error.details.reduce((acc, detail) => {
        if (detail.type === "object.unknown" || detail.type === "object.base") {
          return acc;
        }
        acc[detail.path[0]] = detail.message;
        return acc;
      }, {});
      return res.status(400).json(errors);
    }
  };
};
