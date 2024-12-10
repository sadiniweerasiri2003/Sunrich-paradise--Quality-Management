const express = require('express');
const router = express.Router();
const StockDamage = require('../models/stockDamageModel');

// Add stock damage route
router.post("/add", (req, res) => {
    const { productID, damage } = req.body;

    const newStockDamage = new StockDamage({
        productID,
        damage
    });

    newStockDamage.save()
        .then(() => {
            res.json("Stock damage added successfully.");
        })
        .catch((err) => {
            console.error("Error adding stock damage:", err);
            res.status(500).json({ error: "An error occurred while adding stock damage." });
        });
});

// Retrieve all stock damages route
router.get("/all", (req, res) => {
    StockDamage.find({})
        .then((stockDamages) => {
            res.json(stockDamages);
        })
        .catch((err) => {
            console.error("Error retrieving stock damages:", err);
            res.status(500).json({ error: "An error occurred while retrieving stock damages." });
        });
});

// Update stock damage route
router.put("/update/:id", (req, res) => {
    const { productID, damage } = req.body;

    StockDamage.findByIdAndUpdate(req.params.id, { productID, damage }, { new: true })
        .then(() => {
            res.json("Stock damage updated successfully.");
        })
        .catch((err) => {
            console.error("Error updating stock damage:", err);
            res.status(500).json({ error: "An error occurred while updating stock damage." });
        });
});

// Delete stock damage route
router.delete("/delete/:id", (req, res) => {
    StockDamage.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json("Stock damage deleted successfully.");
        })
        .catch((err) => {
            console.error("Error deleting stock damage:", err);
            res.status(500).json({ error: "An error occurred while deleting stock damage." });
        });
});

module.exports = router;
