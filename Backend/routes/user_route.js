const express = require("express");
const router = express.Router();

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config-file/config");
const protectedResource = require("../middleware/protectedResource");

// Import Mongoose and the UserModel
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

// Define a POST route for user registration
router.post("/registration", (req, res) => {
  // Extract data from the request body
  const { firstName, lastName, email, password, profileImg } = req.body;

  // Check for missing mandatory fields
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ error: "One or more mandatory fields are empty" });
  }

  // Check if a user with the same email already exists
  UserModel.findOne({ email: email })
    .then((userInDB) => {
      if (userInDB) {
        return res
          .status(500)
          .json({ error: "User with this email already registered" });
      } else {
        // Hash the password and create a new user
        bcryptjs
          .hash(password, 16)
          .then((hashedPassword) => {
            const user = new UserModel({
              firstName,
              lastName,
              email,
              password: hashedPassword,
              profileImg,
            });
            user
              .save()
              .then((newUser) => {
                res
                  .status(201)
                  .json({ result: "User registered successfully!" });
              })
              .catch((err) => {
                console.error(err);
                res
                  .status(500)
                  .json({ error: "Error while saving user to the database" });
              });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error hashing the password" });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error while checking email existence" });
    });
});

// Define a POST route for user login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "One or more mandatory fields are empty" });
  }

  UserModel.findOne({ email: email })
    .then((userInDB) => {
      if (!userInDB) {
        return res.status(401).json({ error: "Invalid Credentials" });
      } else {
        bcryptjs
          .compare(password, userInDB.password)
          .then((didMatch) => {
            if (didMatch) {
              // Define and set the JWT_SECRET variable with your secret key.
              const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
              const userInfo = {
                _id: userInDB._id,
                email: userInDB.email,
                firstName: userInDB.firstName,
                lastName: userInDB.lastName,
              };
              // Send the JWT token and user info in the response.
              res
                .status(200)
                .json({ result: { token: jwtToken, user: userInfo, profileImg: userInDB.profileImg } });
            } else {
              return res.status(401).json({ error: "Invalid Credentials" });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error during password comparison" });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error while checking email existence" });
    });
});

// Define a PUT route for updating user data
router.put("/updateUser", protectedResource, async (req, res) => {
  // Get the user ID from the token
  const userId = req.user._id;

  // Extract fields from the request body
  const { firstName, lastName, password, profileImg } = req.body;

  // Find the user by ID
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields if they are provided
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (password) {
      // Hash and update the password if provided
      const hashedPassword = await bcryptjs.hash(password, 16);
      user.password = hashedPassword;
    }

    // Save the updated user
    if (profileImg) {
      // Handle updating profile image (if provided)
      // Assuming you save the image URL in user.profileImg
      user.profileImg = profileImg;
    }

    const updatedUser = await user.save();
    const userInfo = {
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    };

    // Send the response once after all updates are complete
    res.status(200).json({
      result: "User updated successfully",
      user: userInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while updating user" });
  }
});

// Define a GET route for retrieving user profile image
router.get("/profileImg", protectedResource, (req, res) => {
  const userId = req.user._id;

  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the user has a profileImg
      if (!user.profileImg) {
        return res
          .status(404)
          .json({ error: "Profile image not found for this user" });
      }

      // Return the profileImg URL
      res.status(200).json({ profileImg: user.profileImg });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error while finding user" });
    });
});

// Export the router to use it in other parts of your application
module.exports = router;
