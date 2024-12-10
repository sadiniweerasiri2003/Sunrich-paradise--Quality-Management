const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    userId: {
        type: String,
        default: "123", 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    inquiryTitle: {
        type: String,
        required: true
    },
    inquiryBody: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
