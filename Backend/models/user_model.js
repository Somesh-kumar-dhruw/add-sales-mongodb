// Import the Mongoose library to work with MongoDB.
const mongoose = require('mongoose');

// Define a Mongoose schema for the user model.
const userSchema = new mongoose.Schema({
    // First name of the user, required field.
    firstName: {
        type: String,
        required: true
    },
    // Last name of the user, required field.
    lastName: {
        type: String,
        required: true
    },
    // Email of the user, required field.
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Password of the user, required field.
    password: {
        type: String,
        required: true
    },
    // Profile image URL of the user, with a default image.
    profileImg: {
        type: String,
    }
});

// Create a Mongoose model called "UserModel" using the userSchema.
mongoose.model("UserModel", userSchema);


