const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/AuthRoutes");
const productRoutes = require("./routes/ProductRoutes");
const manufacturerRoutes = require("./routes/ManufacturerRoutes");
const cookieParser = require("cookie-parser");
const app = express();

//Create server
app.listen(process.env.PORT, () => {
  console.log("server started");
});

//Connect to db
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", manufacturerRoutes);
