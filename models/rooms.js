const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    roomName: { type: String, required: false },
    capacity: { type: Number, required: true },
});

module.exports = mongoose.model("Room", roomSchema);
