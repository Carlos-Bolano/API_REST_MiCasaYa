import upload from "../libs/multer.js";

export const uploadImagesWithMulter = async (req, res, next) => {
  // this multer upload is here because when there are more than 4 images multer throws an error but
  // this error is never returned to the user, I did this to handle errors with images.
  upload.array("images", 4)(req, res, (err) => {
    if (err) {
      // if there any error with the upload, it is returned to the user
      return res
        .status(400)
        .json({ error: "Numero maximo de imagenes debe ser de 4" });
    }
    next(); // if there are no errors, the next function is called.
    // This is important because the next function is the one that will handle the request.
    //If there are no errors, the next function is the one that will handle the request.
  });
};
