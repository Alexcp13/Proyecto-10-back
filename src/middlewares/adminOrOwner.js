
const Event = require("../api/models/eventModels");
const User = require("../api/models/userModels");
const { verifyKey } = require("../utils/jwt");


const adminOrOwner = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");

        const { id } = verifyKey(parsedToken);

        const user = await User.findById(id);
        const eventId = req.params.id
        const event = await Event.findById(eventId);


        if (event.createdBy.toString() == user.id || user.rol == 'admin') {

            next();
        } else {
            return res.status(400).json("Esta acción sólo la pueden realizar los administradores")
        }


    } catch (error) {
        return res.status(400).json({ message: "No estás autorizado como admin", error: error.message });
    }
}


module.exports = { adminOrOwner }