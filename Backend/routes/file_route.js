// Import necessary libraries and modules
const express = require("express");
const router = express.Router();
const multer = require("multer"); // Middleware for handling file uploads
const path = require("path"); // Module for working with file paths

// Configure multer for file uploads
const storage = multer.diskStorage({
  // Specify the destination directory where uploaded files will be stored
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads/' directory
  },
  // Define the filename for uploaded files, including a timestamp to make it unique
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + filename);
  }
});

// Define a function to filter the uploaded files by file type
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    // Allow JPEG, JPG, and PNG files
    cb(null, true);
  } else {
    // Reject files with other mime types
    cb(new Error("Invalid file type. Only JPEG, JPG, and PNG files are allowed."), false);
  }
};

// Create a multer instance with the configured storage and file filter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
  },
  fileFilter: fileFilter
});

// Handle POST requests to upload files
router.post("/uploadFile", upload.single('file'), (req, res) => {
  if (!req.file) {
    // If no file is provided in the request, respond with an error
    return res.status(400).json({ error: "No file provided" });
  }
  // Respond with the filename of the uploaded file
  res.json({ fileName: req.file.filename });
});

// Define a function to handle file downloads
const downloadFile = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", fileName); // Construct the file path

  // Use the 'res.download' method to initiate file download
  res.download(filePath, (error) => {
    if (error) {
      // Handle any errors during file download
      res.status(500).json({ msg: "File cannot be downloaded" });
    }
  });
};

// Handle GET requests to download files by filename
router.get("/:filename", downloadFile);

// Export the router for use in other parts of the application
module.exports = router;
