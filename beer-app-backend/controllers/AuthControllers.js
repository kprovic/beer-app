const UserModel = require("../models/UserModel");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.PRIVATE_KEY, {
    expiresIn: "24h",
  });
};

const handleErrors = (err) => {
  let errors = { msg: "" };

  if (err.message === "incorrect email") {
    errors.msg = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.msg = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.msg = "Email is already registered";
  }
  return errors;
};

const register = async (req, res, next) => {
  try {
    const { email, password, name, lastName } = req.body;
    const user = await UserModel.create({ email, password, name, lastName });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: 86400000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors });
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: 86400000,
    });
    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors });
  }
};

module.exports = {
  register,
  login,
};
