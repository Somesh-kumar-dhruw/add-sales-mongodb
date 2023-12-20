// Import necessary libraries and modules
const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const { MONGODB_URL } = require('./config-file/config'); 
const PORT = 5001; 


const app = express(); 

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(MONGODB_URL); // Connect to MongoDB using the specified URL

mongoose.connection.on('connected', () => {
    console.log('DB connected'); // Log a message when the database connection is established
});

mongoose.connection.on('error', (error) => {
    console.error("Error connecting to DB:", error); // Log an error message if there's a database connection error
});

// Import and use models for user and sales entry
require('./models/user_model');
require('./models/sales_entry_model');

// Import and use routes for user, sales entry, and file handling
app.use(require('./routes/user_route'));
app.use(require('./routes/sales_entry_route'));
app.use(require('./routes/file_route'));

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`); 
});
