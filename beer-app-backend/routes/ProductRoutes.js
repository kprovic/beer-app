const router = require("express").Router();
const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getSpecProduct,
  filterProducts,
} = require("../controllers/ProductControllers");

router
  .post("/addproduct", addProduct)
  .get("/products", getProducts)
  .get("/beerdetails/:id", getProduct)
  .delete("/beerdetails/:id", deleteProduct)
  .get("/editproduct/:id", getProduct)
  .put("/editproduct/:id", updateProduct);

module.exports = router;
