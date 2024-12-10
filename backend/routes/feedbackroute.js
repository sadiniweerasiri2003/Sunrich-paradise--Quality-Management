const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');
const multer = require('multer');

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify destination directory for file uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix=Date.now();
    cb(null,uniqueSuffix+file.originalname);
  }
});

const upload = multer({ storage: storage });

// Add feedback route
router.post("/add", upload.array('images', 5), (req, res) => {
  const { name, email, rating, reviewTitle } = req.body;
  const images = req.files.map(file => file.path.replace(/\\/g, '/')); // Replace backslashes with forward slashes in paths

  const newFeedback = new Feedback({
    name,
    email,
    rating,
    reviewTitle,
    images // Assign image paths to the images field
  });

  newFeedback.save()
    .then(() => {
      res.json("Feedback added successfully.");
    })
    .catch((err) => {
      console.error("Error adding feedback:", err);
      res.status(500).json({ error: "An error occurred while adding feedback." });
    });
});

// Retrieve feedback route
router.get("/", (req, res) => {
    const productId = req.query.product_id;

    Feedback.find({ productId })
        .then((feedback) => {
            res.json(feedback);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error fetching feedback." });
        });
});

// Update feedback route
router.put("/update/:id", async (req, res) => {
    const feedbackId = req.params.id;
  
    const { name, email, rating, reviewTitle, userId } = req.body;
  
    const updateFeedback = {
      name,
      email,
      rating,
      reviewTitle,
      userId
    };
  
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, updateFeedback);
      if (!updatedFeedback) {
        return res.status(404).send({ status: "error", message: "Feedback not found" });
      }
  
      res.status(200).send({ status: "Feedback updated", feedback: updatedFeedback });
    } catch (err) {
      console.error("Error updating feedback:", err);
      res.status(500).send({ status: "error", message: "Error updating feedback" });
    }
});

// Delete feedback route
router.delete("/delete/:id", async (req, res) => {
    const feedbackId = req.params.id;
    try {
        await Feedback.findByIdAndDelete(feedbackId);
        res.status(200).send({ status: "Feedback deleted" });
    } catch (err) {
        console.error("Error deleting feedback:", err);
        res.status(500).send({ status: "Error deleting feedback", error: err.message });
    }
});
// Route to get feedback data with optional date range filtering
router.get('/get-feedbacks', async (req, res) => {
  try {
    let query = {}; // Define an empty query object

    // Check if startDate and endDate query parameters are provided
    if (req.query.startDate && req.query.endDate) {
      // Parse startDate and endDate from query parameters
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);

      // Add createdAt field to the query to filter by date range
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Fetch feedbacks based on the query
    const feedbacks = await Feedback.find(query);
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

//retrieve feedback relevant for one user
router.get("/feedbacklist", async (req, res) => {
  const predefinedUserId = "234"; // Predefined user ID

  try {
      const feedbacks = await Feedback.find({ userId: predefinedUserId });
      res.json(feedbacks);
  } catch (err) {
      console.error(err);
      res.status(500).send({ status: "Error fetching feedbacks", error: err.message });
  }
});

module.exports = router;
  