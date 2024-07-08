const { deleteFile } = require("../../utils/deleteFile");
const { verifyKey } = require("../../utils/jwt");
const Event = require("../models/eventModels");
const User = require("../models/userModels");





const getEvent = async (req, res, next) => {



    try {
        const events = await Event
            .find()
            .populate("assistants")
            .populate("createdBy");

        return res.status(200).json(events);

    } catch (error) {
        return res.status(400).json("error");
    }
}





const getMyEvents = async (req, res, next) => {

    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");
        const { id } = verifyKey(parsedToken);

        const userId = req.user._id;
        const events = await Event.find({
            $or: [
                { createdBy: userId },
                { assistants: userId }
            ]
        }).populate("assistants")


        return res.status(200).json(events);
    } catch (error) {
        return res.status(400).json("error");
    }
}



const getEventById = async (req, res, next) => {

    try {
        const { id } = req.params;

        const event = await Event.findById(id).populate("assistants");

        return res.status(200).json(event);


    } catch (error) {
        return res.status(400).json("error");
    }
}

const createEvent = async (req, res, next) => {


    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");
        const { id } = verifyKey(parsedToken);

        const newEvent = new Event(req.body);
        newEvent.createdBy = id

        if (req.file) {
            newEvent.eventImg = req.file.path;
        }
        else {

            newEvent.eventImg = 'https://res.cloudinary.com/dhqmsb9vm/image/upload/f_auto,q_auto/v1/eventos/h1a8empe3hm8nqf8apvt';
        }
        const eventSaved = await newEvent.save()

        return res.status(201).json(eventSaved);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateEventData = req.body;


        const updateObject = {};
        if (updateEventData.title) updateObject.title = updateEventData.title;
        if (updateEventData.date) updateObject.date = updateEventData.date;
        if (updateEventData.location) updateObject.location = updateEventData.location;
        if (updateEventData.description) updateObject.description = updateEventData.description;
        ;

        const eventUpdated = await Event.findByIdAndUpdate(id, updateObject, { new: true });
        return res.status(200).json(eventUpdated);
    } catch (error) {
        return res.status(500).json({ error: "error al actualizar evento" });
    }
}
const deleteEvent = async (req, res, next) => {

    try {

        const { id } = req.params;
        const eventDeleted = await Event.findByIdAndDelete(id);


        deleteFile(eventDeleted.eventImg);
        return res.status(200).json(eventDeleted);

    } catch (error) {
        return res.status(400).json(error);
    }
}

const addAssistant = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace("Bearer ", "");
        const { id } = verifyKey(parsedToken);



        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json(error);
        }
        if (!event.assistants.includes(id)) {
            event.assistants.push(id)
        }


        await event.save();
        res.status(200).json({ message: "Asistente añadido correctamente" });
    } catch (error) {
        res.status(500).json(error);
    }
};

const removeAssistant = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }
        event.assistants.pull(req.body.userId);
        await event.save();
        res.status(200).json({ message: "Asistente eliminado correctamente" });
    } catch (error) {
        res.status(500).json(error);
    }
};



module.exports = {
    getEvent, getEventById, updateEvent, createEvent, deleteEvent, addAssistant, removeAssistant, getMyEvents
}



