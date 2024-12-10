const express = require('express');
const Reply = require('../models/reply'); // Assuming your reply model is in replyModel.js

const router = express.Router();

// Route to add a reply
router.post('/add', async (req, res) => {
  const { inquiryId, reply } = req.body; 

 
  if (!inquiryId || !reply) {
    return res.status(400).json({ message: 'Missing required fields (inquiryId, reply)' });
  }

  try {
    const newReply = new Reply({ inquiryid: inquiryId, reply });
    const savedReply = await newReply.save(); 
    res.json(savedReply); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving reply' });
  }
});
// Route to get all replies
router.get('/', async (req, res) => {
  try {
    const replies = await Reply.find({}); 
    res.json(replies); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving replies' }); // Handle errors
  }
});

// Route to get a specific reply by ID (optional)
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameter

  try {
    const reply = await Reply.findById(id); // Find reply by ID
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' }); // Handle not found error
    }
    res.json(reply); // Send the retrieved reply back to the front-end
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving reply' }); // Handle errors
  }
});
// Route to update a reply by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameter
  const { reply } = req.body; // Extract the updated reply text from the request body

  // Validate input (optional)
  if (!reply) {
    return res.status(400).json({ message: 'Missing required field (reply)' });
  }

  try {
    const updatedReply = await Reply.findByIdAndUpdate(id, { reply }, { new: true }); // Find and update the reply
    if (!updatedReply) {
      return res.status(404).json({ message: 'Reply not found' }); // Handle not found error
    }
    res.json(updatedReply); // Send the updated reply back to the front-end
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating reply' }); // Handle errors
  }
});
// Route to delete a reply by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameter

  try {
    const deletedReply = await Reply.findByIdAndDelete(id); // Find and delete the reply
    if (!deletedReply) {
      return res.status(404).json({ message: 'Reply not found' }); // Handle not found error
    }
    res.json({ message: 'Reply deleted successfully' }); // Send success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting reply' }); // Handle errors
  }
});

module.exports = router;
