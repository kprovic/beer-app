const { default: mongoose } = require("mongoose");
const manufacturerModel = require("../models/ManufacturerModel");
const productModel = require("../models/ProductModel");

const addManufacturer = (req, res) => {
  try {
    const { name, description, year, country, webPage, imageLink } = req.body;
    manufacturerModel.create({
      name,
      description,
      year,
      country,
      webPage,
      imageLink,
    });
    res.json({ status: true });
  } catch (error) {
    res.json(error);
  }
};

const getManufacturers = async (req, res) => {
  try {
    const manufacturers = await manufacturerModel.find();
    res.json(manufacturers);
  } catch (error) {
    res.json(error);
  }
};

const getManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const manufacturer = await manufacturerModel.findById(id);
    res.json(manufacturer);
  } catch (error) {
    console.log(error);
  }
};

const deleteManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const manufacturer = await manufacturerModel.findById(id);
    const products = await productModel.find({
      manufacturer: manufacturer.name,
    });
    if (products.length == 0) {
      const deletedItem = await manufacturerModel.findByIdAndDelete(id);
      if (deletedItem) {
        res.json({ status: true });
      }
    } else {
      res.json({
        error: "cannot delete while the manufacturer contains products",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, year, country, webPage, imageLink } = req.body;
    const updatedManufacturer = await manufacturerModel.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        year: year,
        country: country,
        webPage: webPage,
        imageLink: imageLink,
      },
      { new: true }
    );
    if (updatedManufacturer) res.json({ status: true });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  addManufacturer,
  getManufacturers,
  getManufacturer,
  deleteManufacturer,
  updateManufacturer,
};
