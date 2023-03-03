const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createCategory,
  getCategorys,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

router.post("/", protect, createCategory);
router.patch("/:id", protect, updateCategory);
router.get("/", protect, getCategorys);
router.get("/:id", protect, getCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
