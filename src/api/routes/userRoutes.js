


const { registerUser, login, getUsers, getUserById, } = require("../controllers/userControllers");

const usersRoutes = require("express").Router();


usersRoutes.get("/", getUsers)
usersRoutes.get("/:id", getUserById);
usersRoutes.post("/register", registerUser)
usersRoutes.post("/login", login)







module.exports = usersRoutes;