
const User = require("../api/models/userModels");
const { verifyKey } = require("../utils/jwt");


const checkRole = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");

        const { id } = verifyKey(parsedToken);

        const user = await User.findById(id);



        if (user.rol === "admin") {
            user.password = null;
            req.user = user;
            next();
        } else {
            return res.status(400).json("Esta acción sólo la pueden realizar los administradores")
        }


    } catch (error) {
        return res.status(400).json({ message: "No estás autorizado como admin", error: error.message });
    }
}


module.exports = { checkRole }