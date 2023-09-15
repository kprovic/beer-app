const {
  addManufacturer,
  getManufacturers,
  getManufacturer,
  deleteManufacturer,
  updateManufacturer,
} = require("../controllers/ManufacturerControllers");

const router = require("express").Router();

router
  .post("/addmanufacturer", addManufacturer)
  .get("/manufacturers", getManufacturers)
  .get("/manufacturersdetails/:id", getManufacturer)
  .delete("/manufacturersdetails/:id", deleteManufacturer)
  .get("/edit/:id", getManufacturer)
  .put("/edit/:id", updateManufacturer);

module.exports = router;
