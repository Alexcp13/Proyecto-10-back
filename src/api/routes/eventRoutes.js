
const { adminOrOwner } = require("../../middlewares/adminOrOwner");
const { isAuth } = require("../../middlewares/auth");

const upload = require("../../middlewares/file");
const { getEvent, deleteEvent, getEventById, createEvent, updateEvent, addAssistant, removeAssistant, getMyEvents, } = require("../controllers/eventControllers");





const eventRoutes = require("express").Router();


eventRoutes.get("/", getEvent)
eventRoutes.get("/:id/myEvents", isAuth, getMyEvents)
eventRoutes.get("/:id", getEventById);
eventRoutes.post("/", isAuth, upload.single('eventImg'), createEvent);
eventRoutes.patch("/:id", isAuth, adminOrOwner, updateEvent);
eventRoutes.patch("/:id/add", isAuth, addAssistant);
eventRoutes.patch("/:id/remove", isAuth, removeAssistant);
eventRoutes.delete("/:id", isAuth, adminOrOwner, deleteEvent)






module.exports = eventRoutes;


