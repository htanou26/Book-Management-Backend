const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
  },
  name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true
  },
  isbn: {
      type: String,
      required: true,
      default: "ISBN",
      trim: true
  },
  category: {
      type: String,
      required: [true, "Please add a category"],
      default: "Category",
      trim: true
  },
  auteur: {
      type: String,
      required: [true, "Please add a auteur"],
      trim: true
  },
  editeur: {
      type: String,
      required: [true, "Please add a editeur"],
      trim: true
  },
  image: {
      type: Object,
      default: {}
  },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
