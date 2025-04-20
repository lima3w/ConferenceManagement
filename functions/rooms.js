const mongoose = require("mongoose");

const config = require("../config");

const Room = require("../models/rooms");
const connectToDatabase = require("../functions/database");

/**
 * Retrieves a list of rooms from the MongoDB database using Mongoose.
 * @async
 * @function getRooms
 * @returns {Promise<Array<Object>>} A Promise that resolves with an array of room objects.
 * @throws {Error} If there is an error retrieving the rooms.
 */
async function getRooms() {
    try {
        await connectToDatabase();
        const rooms = await Room.find({});
        return rooms;
    } catch (error) {
        console.error("Error getting rooms:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

/**
 * Retrieves a room from the MongoDB database using Mongoose.
 * @async
 * @function getRoomById
 * @returns {Promise<Object>} A Promise that resolves with an array of room objects.
 * @throws {Error} If there is an error retrieving the rooms.
 */
async function getRoomById(uid) {
    try {
        await connectToDatabase();
        const rooms = await Room.findById(uid);
        return rooms;
    } catch (error) {
        console.error("Error getting room:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

/**
 * Creates a new room in the MongoDB database using Mongoose.
 * @async
 * @function createRoom
 * @param {Object} roomData - An object containing the room's data.
 * @returns {Promise<Object>} A Promise that resolves with the newly created room object.
 * @throws {Error} If there is an error creating the room.
 */
async function createRoom(roomData) {
    try {
        await connectToDatabase();

        // Create a new room document using the provided data
        const newRoom = new Room(roomData);

        // Save the new room to the database
        const savedRoom = await newRoom.save();

        return savedRoom;
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    } finally {
        await mongoose.disconnect();
    }
}

// Export the functions
module.exports = { connectToDatabase, getRooms, createRoom, getRoomById };
