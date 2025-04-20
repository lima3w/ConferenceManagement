const mongoose = require("mongoose");

const config = require("../config");

const Registration = require("../models/registrations");

const connectToDatabase = require("../functions/database");

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
        const registrations = await Registration.find({}).populate({
            path: "user",
            select: "firstName surName company",
        });
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
