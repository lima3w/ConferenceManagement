const mongoose = require("mongoose");

const config = require("../config");

const Session = require("../models/sessions");

const connectToDatabase = require("../functions/database");

/**
 * Retrieves a list of sessions from the MongoDB database using Mongoose.
 * @async
 * @function getSessions
 * @returns {Promise<Array<Object>>} A Promise that resolves with an array of session objects.
 * @throws {Error} If there is an error retrieving the sessions.
 */
async function getSessions() {
    try {
        await connectToDatabase();
        const sessions = await Session.find({})
            .populate({
                path: "speakers",
                select: "firstName surName company",
            })
            .populate({ path: "room", select: "roomNumber roomName" });
        return sessions;
    } catch (error) {
        console.error("Error getting sessions:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

/**
 * Retrieves a session from the MongoDB database using Mongoose.
 * @async
 * @function getSessionById
 * @returns {Promise<Object>} A Promise that resolves with an array of session objects.
 * @throws {Error} If there is an error retrieving the sessions.
 */
async function getSessionById(uid) {
    try {
        await connectToDatabase();
        const sessions = await Session.findById(uid);
        return sessions;
    } catch (error) {
        console.error("Error getting session:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

/**
 * Creates a new session in the MongoDB database using Mongoose.
 * @async
 * @function createSession
 * @param {Object} sessionData - An object containing the session's data.
 * @returns {Promise<Object>} A Promise that resolves with the newly created session object.
 * @throws {Error} If there is an error creating the session.
 */
async function createSession(sessionData) {
    try {
        await connectToDatabase();

        // Create a new Session document using the provided data
        const newSession = new Session(sessionData);

        // Save the new session to the database
        const savedSession = await newSession.save();

        return savedSession;
    } catch (error) {
        console.error("Error creating session:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

// Export the functions
module.exports = {
    connectToDatabase,
    getSessions,
    createSession,
    getSessionById,
};
