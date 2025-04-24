const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema(
    {
        speaker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        bio: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt fields automatically
    }
);

module.exports = mongoose.model("Speaker", speakerSchema);
