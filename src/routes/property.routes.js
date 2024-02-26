import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updatePropertyInfoById,
  deletePropertyById,
  getAllMyProperties,
  updatePropertyImagesById,
} from "../controllers/property.controller.js";

import { propertySchema } from "../schemas/property.schema.js";

import { uploadImagesWithMulter } from "../middlewares/validateImagesMulter.js";
import { cleanUploadsFolder } from "../middlewares/cleanUploadsFolder.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/properties", getAllProperties);

router.get("/myProperties", authRequired, getAllMyProperties);

router.get("/properties/:id", authRequired, getPropertyById);

router.post(
  "/properties",
  authRequired,
  cleanUploadsFolder,
  uploadImagesWithMulter,
  validateSchema(propertySchema),
  createProperty
);

router.put(
  "/properties/:id",
  authRequired,
  validateSchema(propertySchema),
  updatePropertyInfoById
);

router.put("/update-images/:id", authRequired, updatePropertyImagesById);

router.delete("/properties/:id", authRequired, deletePropertyById);

export default router;
