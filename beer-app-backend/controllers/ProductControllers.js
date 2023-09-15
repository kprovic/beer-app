const ProductModel = require("../models/ProductModel");

const addProduct = (req, res) => {
  try {
    const { name, price, type, manufacturer, imageLink, alcoholPercentage } =
      req.body;
    ProductModel.create({
      name,
      price,
      type,
      manufacturer,
      imageLink,
      alcoholPercentage,
    });
    res.json({ status: true });
  } catch (error) {
    res.json(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    res.json(product);
  } catch (error) {
    res.json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (product) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    res.json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, type, manufacturer, imageLink, alcoholPercentage } =
      req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
      name: name,
      price: price,
      type: type,
      manufacturer: manufacturer,
      imageLink: imageLink,
      alcoholPercentage: alcoholPercentage,
    });
    if (updatedProduct) res.json({ status: true });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
