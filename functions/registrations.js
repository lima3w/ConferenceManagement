const mongoose = require("mongoose");

const config = require("../config");

const uri = config.mongodb.uri;

const registrationSchema = require("../models/registrations");

// Create the Registration model
const Registration = mongoose.model("Registration", registrationSchema);

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

/**
 * Retrieves a list of registrations from the MongoDB database using Mongoose.
 * @async
 * @function getRegistrations
 * @returns {Promise<Array<Object>>} A Promise that resolves with an array of registration objects.
 * @throws {Error} If there is an error retrieving the registrations.
 */
async function getRegistrations() {
    try {
        await connectToDatabase();
        const registrations = await Registration.find(
            {},
            "firstName surName email"
        );
        // return JSON.stringify(registrations);
        return registrations;
    } catch (error) {
        console.error("Error getting registrations:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

/**
 * Retrieves a registration from the MongoDB database using Mongoose.
 * @async
 * @function getRegistrationById
 * @returns {Promise<Object>} A Promise that resolves with an array of registration objects.
 * @throws {Error} If there is an error retrieving the registrations.
 */
async function getRegistrationById(uid) {
    try {
        await connectToDatabase();
        const registrations = await Registration.findById(uid);
        return registrations;
    } catch (error) {
        console.error("Error getting registration:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

/**
 * Creates a new registration in the MongoDB database using Mongoose.
 * @async
 * @function createRegistration
 * @param {Object} registrationData - An object containing the registration's data.
 * @returns {Promise<Object>} A Promise that resolves with the newly created registration object.
 * @throws {Error} If there is an error creating the registration.
 */
async function createRegistration(registrationData) {
    try {
        await connectToDatabase();

        // Create a new Registration document using the provided data
        const newRegistration = new Registration(registrationData);

        // Save the new registration to the database
        const savedRegistration = await newRegistration.save();

        return savedRegistration;
    } catch (error) {
        console.error("Error creating registration:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

// Export the functions
module.exports = {
    connectToDatabase,
    getRegistrations,
    createRegistration,
    getRegistrationById,
};
