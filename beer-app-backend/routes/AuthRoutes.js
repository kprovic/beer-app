const { register, login, getUsers } = require("../controllers/AuthControllers");
const { checkUser } = require("../middleware/AuthMiddleware");

const router = require("express").Router();

router.post("/register", register).post("/login", login).post("/", checkUser);

module.exports = router;
