const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Product = require("../models/productModel");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  const { name, description} = req.body;

  //   Validation
  if (!name || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Create Category
  const category = await Category.create({
    user: req.user.id,
    name,
    description
  });
  res.status(201).json(category);
});

// Get all Categorys
const getCategorys = asyncHandler(async (req, res) => {
  const category = await Category.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(category);
});

// Get single Category
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  // if Category doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  // Match Category to its user
  if (category.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(category);
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  const product = await Product.find({user: req.user.id,
    category : category.name})
    
  // if Category doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  // Match Category to its user
  if (category.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  for (var val of product) {
  const p = await Product.findById(val._id);
  await p.remove()    
  }
  await category.remove();
  res.status(200).json({ message: "Category deleted." });
});

// Update Category
const updateCategory = asyncHandler(async (req, res) => {
  //console.log(req.body);
    const { name, description} = req.body;
    const { id } = req.params;

  const category = await Category.findById(id);

  // if Category doesnt exist
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  // Match category to its user
  if (category.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // Update Category
  const updatedCategory = await Category.findByIdAndUpdate(
    { _id: id },
    {
      name,
      description
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json(updatedCategory);
});

module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  deleteCategory,
  updateCategory,
};
