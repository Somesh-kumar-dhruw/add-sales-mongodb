// Import the Mongoose library for working with MongoDB
const mongoose = require("mongoose");

// Import the ObjectId data type from Mongoose's Schema.Types
const { ObjectId } = mongoose.Schema.Types;

// Define the schema for the Sales Entry model
const postSchema = new mongoose.Schema(
  {
    // Define the 'salesId' field with a type of String, and it's required
    salesId: {
      type: String,
      required: true,
    },
    
    // Define the 'productName' field with a type of String, and it's required
    productName: {
      type: String,
      required: true,
    },
    
    // Define the 'quantity' field with a type of Number, and it's required
    quantity: {
      type: Number,
      required: true,
    },
    
    // Define the 'amount' field with a type of Number, and it's required
    amount: {
      type: Number,
      required: true,
    },
    
    // Define the 'author' field with a type of ObjectId, which references the 'UserModel'
    author: {
      type: ObjectId,
      ref: "UserModel", // This field references the 'UserModel' for the author
    },
    
    // Define the 'authorEmail' field with a type of String
    authorEmail: {
      type: String,
    },
  },
  // Additional options for the schema
  { timestamps: true } // This includes 'createdAt' and 'updatedAt' timestamps
);

// Create a Mongoose model named 'SalesEntryModel' using the schema
mongoose.model("SalesEntryModel", postSchema);

// Export the 'SalesEntryModel' for use in other parts of the application
