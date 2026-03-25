const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['idCard', 'books', 'calculator', 'waterBottle', 'accessories', 'electronics', 'documents', 'other'],
    required: true,
  },
  type: {
    type: String,
    enum: ['lost', 'found'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  foundDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'resolved'],
    default: 'available',
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  claimDate: {
    type: Date,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Item', itemSchema);
