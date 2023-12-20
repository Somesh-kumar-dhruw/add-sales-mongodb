// Import required libraries and modules
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config-file/config"); // Import JWT_SECRET from the configuration file

const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

// Export a middleware function that verifies the user's JWT token
module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    // Check if the 'Authorization' header is missing
    if (!authorization) {
        return res.status(401).json({ error: "User not logged in" });
    }

    // Extract the JWT token from the 'Authorization' header (Bearer token format)
    const token = authorization.replace("Bearer ", "");

    // Verify the JWT token using the JWT_SECRET
    jwt.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
            // If token verification fails, respond with a 401 Unauthorized error
            return res.status(401).json({ error: "User not logged in" });
        }

        // Extract the user's unique ID (_id) from the JWT payload
        const { _id } = payload;

        // Find the user in the database by their ID
        UserModel.findById(_id)
            .then((dbUser) => {
                if (!dbUser) {
                    // If the user is not found, respond with a 401 Unauthorized error
                    return res.status(401).json({ error: "User not found" });
                }

                // Attach the user object to the request object for use in subsequent middleware or routes
                req.user = dbUser;

                // Continue to the next middleware or route
                next();
            })
            .catch((err) => {
                // Handle errors and respond with a 500 Internal Server Error
                console.error(err);
                res.status(500).json({ error: "Error while searching for user" });
            });
    });
};
