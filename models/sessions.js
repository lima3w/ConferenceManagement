const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        speakers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        runtime: {
            type: Number, // duration in minutes
            required: false,
        },
        maxParticipants: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt fields automatically
    }
);

module.exports = mongoose.model("Session", sessionSchema);
