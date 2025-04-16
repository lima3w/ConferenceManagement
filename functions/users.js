const mongoose = require("mongoose");

const config = require("../config");

const uri = config.mongodb.uri;

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

// Create the User model
const User = mongoose.model("User", userSchema);

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
 * Retrieves a list of users from the MongoDB database using Mongoose.
 * @async
 * @function getUsers
 * @returns {Promise<Array<Object>>} A Promise that resolves with an array of user objects.
 * @throws {Error} If there is an error retrieving the users.
 */
async function getUsers() {
  try {
    await connectToDatabase();
    const users = await User.find({}, "firstName surName email");
    // return JSON.stringify(users);
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

/**
 * Retrieves a user from the MongoDB database using Mongoose.
 * @async
 * @function getUserById
 * @returns {Promise<Object>} A Promise that resolves with an array of user objects.
 * @throws {Error} If there is an error retrieving the users.
 */
async function getUserById(uid) {
  try {
    await connectToDatabase();
    const users = await User.findById(uid);
    return users;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

/**
 * Creates a new user in the MongoDB database using Mongoose.
 * @async
 * @function createUser
 * @param {Object} userData - An object containing the user's data.
 * @returns {Promise<Object>} A Promise that resolves with the newly created user object.
 * @throws {Error} If there is an error creating the user.
 */
async function createUser(userData) {
  try {
    await connectToDatabase();

    // Create a new User document using the provided data
    const newUser = new User(userData);

    // Save the new user to the database
    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
  }
}

// Export the functions
module.exports = { connectToDatabase, getUsers, createUser, getUserById };
