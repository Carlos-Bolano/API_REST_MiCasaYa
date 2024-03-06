import Property from "../models/property.model.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      neighborhood,
      price,
      propertyType,
      rooms,
      address,
    } = req.body;
    const userId = req.user.id;

    const newProperty = new Property({
      title,
      description,
      neighborhood,
      price,
      propertyType,
      rooms,
      address,
      user: userId,
    });

    if (req.files && req.files.length > 4) {
      return res
        .status(400)
        .json({ error: "No se pueden subir más de 4 imágenes" });
    }

    if (req.files && req.files.length > 0) {
      const images = [];

      for (const file of req.files) {
        const result = await uploadImage(file.path);
        images.push({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });

        if (await fs.pathExists(file.path)) {
          await fs.unlink(file.path);
        } else {
          console.error(`El archivo ${file.path} no existe`);
        }
      }

      newProperty.images = images;
    }

    if (newProperty.images.length === 0) {
      return res.status(400).json({ error: "Debe subir al menos una imagen" });
    }

    const propertySaved = await newProperty.save();
    res.status(201).json(propertySaved);
  } catch (error) {
    if (req.files) {
      for (const file of req.files) {
        await fs.unlink(file.path).catch((err) => {
          console.error(`Error al eliminar el archivo ${file.path}:`, err);
        });
      }
    }
    console.error(error);
    res.status(500).json({ error: "Error al crear la propiedad" });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.log(error);
  }
};

export const getAllMyProperties = async (req, res) => {
  try {
    const userId = req.user.id;
    const properties = await Property.find({ user: userId }).populate("user");
    res.json(properties);
  } catch (error) {
    console.log(error);
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const id = req.params.id;
    const property = await Property.findById(id).populate("user");
    res.json(property);
  } catch (error) {
    console.log(error);
  }
};

export const updatePropertyInfoById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      neighborhood,
      price,
      propertyType,
      rooms,
      address,
    } = req.body;

    const userId = req.user.id;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    if (property.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para actualizar esta propiedad" });
    }

    property.title = title;
    property.description = description;
    property.neighborhood = neighborhood;
    property.price = price;
    property.address = address;
    property.propertyType = propertyType;
    property.rooms = rooms;

    const updatedProperty = await property.save();

    res.json({ message: "Propiedad actualizada", property: updatedProperty });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Hubo un error al actualizar la propiedad" });
  }
};

export const updatePropertyImagesById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const { publicIdsToDelete } = req.body;

    const publicIds = publicIdsToDelete && JSON.parse(publicIdsToDelete);

    if (property.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para actualizar esta propiedad" });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    // dalete images from cloudinary
    await Promise.all(
      Object.values(publicIds).map((publicId) => deleteImage(publicId))
    );

    property.images = property.images.filter(
      (image) => !Object.values(publicIds).includes(image.public_id)
    );

    if (req.files && req.files.length > 0) {
      const newImages = [];

      for (const file of req.files) {
        const result = await uploadImage(file.path);
        newImages.push({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });

        if (await fs.pathExists(file.path)) {
          await fs.unlink(file.path);
        } else {
          console.error(`El archivo ${file.path} no existe`);
        }
      }

      //add the new images to the array images property
      property.images = property.images.concat(newImages);
    }

    // save the property
    await property.save();

    res.json({ message: "Imágenes de propiedad actualizadas", property });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Hubo un error al actualizar las imágenes de la propiedad",
    });
  }
};

export const deletePropertyById = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    if (property.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar esta propiedad" });
    }

    if (property.images && property.images.length > 0) {
      for (const image of property.images) {
        if (image.public_id) {
          await deleteImage(image.public_id);
        }
      }
    }

    await Property.findByIdAndDelete(id);

    res.json({ message: "Propiedad eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al eliminar la propiedad" });
  }
};
