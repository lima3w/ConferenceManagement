const mongoose = require("mongoose");

const config = require("../config");

const Speaker = require("../models/speakers");

const connectToDatabase = require("../functions/database");

/**
 * Retrieves a list of speakers from the MongoDB database using Mongoose.
 * @async
 * @function getSpeakers
 * @returns {Promise<Array<Object>>} A Promise that resolves with an array of speaker objects.
 * @throws {Error} If there is an error retrieving the speakers.
 */
async function getSpeakers() {
    try {
        await connectToDatabase();
        const speakers = await Speaker.find({}).populate({
            path: "speaker",
            select: "firstName surName company jobTitle profilePic",
        });
        return speakers;
    } catch (error) {
        console.error("Error getting speakers:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

/**
 * Retrieves a speaker from the MongoDB database using Mongoose.
 * @async
 * @function getSpeakerById
 * @returns {Promise<Object>} A Promise that resolves with an array of speaker objects.
 * @throws {Error} If there is an error retrieving the speakers.
 */
async function getSpeakerById(uid) {
    try {
        await connectToDatabase();
        const speakers = await Speaker.findById(uid);
        return speakers;
    } catch (error) {
        console.error("Error getting speaker:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

/**
 * Creates a new speaker in the MongoDB database using Mongoose.
 * @async
 * @function createSpeaker
 * @param {Object} speakerData - An object containing the speaker's data.
 * @returns {Promise<Object>} A Promise that resolves with the newly created speaker object.
 * @throws {Error} If there is an error creating the speaker.
 */
async function createSpeaker(speakerData) {
    try {
        await connectToDatabase();

        // Create a new Speaker document using the provided data
        const newSpeaker = new Speaker(speakerData);

        // Save the new speaker to the database
        const savedSpeaker = await newSpeaker.save();

        return savedSpeaker;
    } catch (error) {
        console.error("Error creating speaker:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

// Export the functions
module.exports = {
    getSpeakers,
    createSpeaker,
    getSpeakerById,
};
