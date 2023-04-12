import Category from "../models/CategoryModels.js";

//get all categories
export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

// get category by id
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "objectId") {
      return res.status(404).json({ message: "category not found" });
    }
    res.status(500).send("server error");
  }
};

//create a new category
export const createCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.name });

    if (category) {
      return res.status(400).json({ msg: "Category already exists" });
    }
    const newCategory = new Category(req.body);

    await newCategory.save();

    res.json(newCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

//update a category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    category.name = name; 
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server Error");
  }
};

// delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    await category.remove();
    res.json({ msg: "Category removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(500).send("Server Error");
  }
};
