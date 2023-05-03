import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  productos: [
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Productos",
      },
      cantidad: {
        type: Number,
        default: 1,
      },
    },
  ],
});

mongoose.set("strictQuery", true);

const cartModel = mongoose.model(collection, schema);

export default cartModel;
