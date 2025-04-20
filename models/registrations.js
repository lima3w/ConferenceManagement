const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    date: { type: Date, required: true },
});

module.exports = mongoose.model("Registration", registrationSchema);
