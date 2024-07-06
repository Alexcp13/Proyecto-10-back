const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    eventImg: { type: String, required: true, },
    date: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    assistants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }

},
    {
        timestamps: true,
        collection: "events"
    });


const Event = mongoose.model("events", eventSchema, "events");

module.exports = Event;