const mongoose = require("mongoose");
const config = require("../config");
const uri = config.mongodb.uri;

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * @async
 * @function connectToDatabase
 * @returns {Promise<void>} A Promise that resolves when the connection is established.
 * @throws {Error} If there is an error connecting to the database.
 */
async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB using Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = connectToDatabase;
