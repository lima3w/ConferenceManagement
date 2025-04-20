const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    company: { type: String, required: false },
    jobTitle: { type: String, required: false },
    profilePicture: { type: String, required: false },
    phone: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
