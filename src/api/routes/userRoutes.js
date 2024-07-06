

const { isAuth } = require("../../middlewares/auth");
const { registerUser, login, getUsers, getUserById, updateUser } = require("../controllers/userControllers");

const usersRoutes = require("express").Router();


usersRoutes.get("/", getUsers)
usersRoutes.get("/:id", getUserById);
usersRoutes.post("/register", registerUser)
usersRoutes.post("/login", login)
usersRoutes.put("/:id", isAuth, updateUser);






module.exports = usersRoutes;