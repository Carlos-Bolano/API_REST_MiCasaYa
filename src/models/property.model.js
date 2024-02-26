import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    rooms: {
      type: String,
      required: true,
      trim: true,
    },
    propertyType: {
      type: String,
      enum: ["casa", "apartamento", "otro"],
      required: true,
    },
    neighborhood: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        secure_url: String,
        public_id: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", propertySchema);
