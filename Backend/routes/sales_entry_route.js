// Import necessary libraries and modules
const express = require("express");
const router = express.Router();
const protectedRoute = require("../middleware/protectedResource");
const mongoose = require("mongoose");
const SalesEntryModel = mongoose.model("SalesEntryModel");

// // Retrieve all sales entries for all users
// router.get("/showentries", (req, res) => {
//   SalesEntryModel.find()
//     .populate("author", "_id firstName lastName profileImg")
//     .then((dbEntries) => {
//       // Respond with a JSON object containing the retrieved entries
//       res.status(200).json({ entries: dbEntries });
//     })
//     .catch((error) => {
//       // Handle errors and respond with a 500 Internal Server Error
//       console.error(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     });
// });

// Retrieve sales entries only from the logged-in user
router.get("/showmyentry", protectedRoute, (req, res) => {
  SalesEntryModel.find({
    author: req.user._id,
  })
    .select("salesId productName quantity amount todaysDate")
    .populate("author", "_id firstName lastName profileImg")
    .then((dbEntries) => {
      // Respond with a JSON object containing the user's entries
      res.status(200).json({ entries: dbEntries });
    })
    .catch((error) => {
      // Handle errors and respond with a 500 Internal Server Error
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Create a new route to calculate total revenue for the current date
router.get('/totalavenue', protectedRoute, async (req, res) => {
  try {
    // Log the user's ID for debugging purposes
    console.log('req.user._id:', req.user._id);

    // Get the current date and set the time to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch sales entries for the current user created today
    const salesForUser = await SalesEntryModel.find({
      author: req.user._id, // Filter by the current user's ID
      createdAt: { $gte: today, $lte: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    });

    // Log the retrieved sales entries for debugging purposes
    console.log('Sales for User:', salesForUser);

    // Calculate the total revenue based on quantity and amount in each entry
    const totalRevenue = salesForUser.reduce((total, entry) => {
      return total + entry.quantity * entry.amount;
    }, 0);

    // Respond with a JSON object containing the total revenue
    res.status(200).json({ totalRevenue });
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: 'Error while calculating total revenue' });
  }
});

// Create a new sales entry
router.post("/entrysales", protectedRoute, async (req, res) => {
  try {
    const { salesId, productName, quantity, amount } = req.body;

    // Check if any of the required fields is missing
    if (!salesId || !productName || !quantity || !amount) {
      return res
        .status(400)
        .json({ error: "One or more mandatory fields are empty" });
    }

    // Remove the user's password from the request object
    req.user.password = undefined;

    // Create a new sales entry object
    const entryObj = new SalesEntryModel({
      salesId,
      productName,
      quantity,
      amount,
      author: req.user,
      authorEmail: req.user.email,
    });

    // Save the entry to the database
    const newEntry = await entryObj.save();

    // Respond with a JSON object containing the created entry
    res.status(201).json({ entry: newEntry });
  } catch (error) {
    // Handle errors and respond with a 500 Internal Server Error
    console.error(error);
    res.status(500).json({ error: "Error while saving the sales entry" });
  }
});

// Export the router for use in other parts of the application
module.exports = router;
