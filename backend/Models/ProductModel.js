import {Schema, model} from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please fill in the name"],
    },
    image: {
      type: String,
      required: [true, "Please select image"],
    },
    color: {
      type: String,
      default: "As seen",
    },
    sku: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "please fill in the price"],
    },

    regularPrice: {
      type: Number,
      required: [true, "please fill in the regular price"],
    },
    description: {
      type: String,
      required: [true, "please fill in the product description"],
    },
    category: {
      type: String,
      required: [true, "please fill in the product category"],
    },
    brand: {
      type: String,
      required: [true, "please fill in the product brand"],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = new model("Product", productSchema);
export default Product;