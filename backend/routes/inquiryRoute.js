const express = require("express");
const router = express.Router();
const Inquiry = require("../models/inquiry");

// Route to retrieve inquiries with only title and body
router.get('/user-inquiry-details', async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}, { inquiryTitle: 1, inquiryBody: 1 });
        res.json(inquiries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving inquiries' });
    }
});

// Add inquiry
router.post("/add", (req, res) => {
    const { name, email, inquiryTitle, inquiryBody } = req.body;
    const newInquiry = new Inquiry({
        name,
        email,
        inquiryTitle,
        inquiryBody
    });

    newInquiry.save()
        .then(() => {
            res.json("Inquiry added");
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json("Error: " + err);
        });
});

// Route to retrieve inquiries for a specific user
router.get("/", async (req, res) => {
  const predefinedUserId = "123"; // Predefined user ID

  try {
      const inquiries = await Inquiry.find({ userId: predefinedUserId });
      res.json(inquiries);
  } catch (err) {
      console.error(err);
      res.status(500).send({ status: "Error fetching inquiries", error: err.message });
  }
});

// Update inquiry
router.put("/update/:id", async (req, res) => {
  const inquiryId = req.params.id;
  const { name, email, inquiryTitle, inquiryBody } = req.body;

  try {
      const updatedInquiry = await Inquiry.findByIdAndUpdate(inquiryId, { name, email, inquiryTitle, inquiryBody }, { new: true });
      if (!updatedInquiry) {
          return res.status(404).send({ status: "error", message: "Inquiry not found" });
      }

      res.status(200).send({ status: "Inquiry updated", inquiry: updatedInquiry });
  } catch (err) {
      console.error("Error updating inquiry:", err);
      res.status(500).send({ status: "error", message: "Error updating inquiry" });
  }
});

// Delete inquiry
router.delete("/delete/:id", async (req, res) => {
  const inquiryId = req.params.id;

  try {
      const deletedInquiry = await Inquiry.findByIdAndDelete(inquiryId);
      if (!deletedInquiry) {
          return res.status(404).send({ status: "error", message: "Inquiry not found" });
      }
      res.status(200).send({ status: "Inquiry deleted" });
  } catch (err) {
      console.error("Error deleting inquiry:", err);
      res.status(500).send({ status: "Error deleting inquiry", error: err.message });
  }
});


// Fetch details of one inquiry
router.get("/get/:id", async (req, res) => {
    const inquiryId = req.params.id;
    try {
        const inquiry = await Inquiry.findById(inquiryId);
        if (!inquiry) {
            return res.status(404).send({ status: "error", message: "Inquiry not found" });
        }
        res.status(200).send({ status: "success", inquiry });
    } catch (err) {
        res.status(500).send({ status: "error", message: "Error fetching data", error: err.message });
    }
});

// Route to retrieve admin inquiry report
router.get('/get-inquiries', async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}, { name: 1, email: 1, inquiryTitle: 1, inquiryBody: 1, createdAt: 1 });
        res.json(inquiries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving admin inquiry report' });
    }
});

// Route to fetch filtered inquiries based on date range
router.get("/inquiry/filter", async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const inquiries = await Inquiry.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });
        res.json(inquiries);
    } catch (error) {
        console.error("Error fetching filtered inquiry data:", error);
        res.status(500).json({ message: "Error fetching filtered inquiry data" });
    }
});

module.exports = router;
