const express = require('express');
const Item = require('../models/Item');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all items (with filters)
router.get('/', async (req, res) => {
  try {
    const { type, category, status, location } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (location) filter.location = new RegExp(location, 'i');

    const items = await Item.find(filter)
      .populate('postedBy', 'name email phone')
      .populate('claimedBy', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('postedBy', 'name email phone')
      .populate('claimedBy', 'name email phone')
      .populate('verifiedBy', 'name email');

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new item (POST)
router.post('/', authMiddleware, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').isIn(['idCard', 'books', 'calculator', 'waterBottle', 'accessories', 'electronics', 'documents', 'other']).withMessage('Invalid category'),
  body('type').isIn(['lost', 'found']).withMessage('Type must be lost or found'),
  body('location').notEmpty().withMessage('Location is required'),
  body('foundDate').notEmpty().withMessage('Date is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, category, type, location, foundDate, image } = req.body;

    const item = new Item({
      title,
      description,
      category,
      type,
      location,
      foundDate,
      image,
      postedBy: req.user.id,
    });

    await item.save();
    await item.populate('postedBy', 'name email phone');

    res.status(201).json({
      message: 'Item posted successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update item (PUT)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check if user is the poster or is admin
    if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this item' });
    }

    item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('postedBy', 'name email phone')
      .populate('claimedBy', 'name email phone');

    res.json({
      message: 'Item updated successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete item (DELETE)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check if user is the poster or is admin
    if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this item' });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Claim an item
router.post('/:id/claim', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.status !== 'available') {
      return res.status(400).json({ error: 'Item is not available for claiming' });
    }

    item.claimedBy = req.user.id;
    item.claimDate = new Date();
    item.status = 'claimed';

    await item.save();
    await item.populate('postedBy', 'name email phone');
    await item.populate('claimedBy', 'name email phone');

    res.json({
      message: 'Item claimed successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify item (Admin only)
router.post('/:id/verify', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    item.isVerified = true;
    item.verifiedBy = req.user.id;

    await item.save();
    await item.populate('postedBy', 'name email phone');

    res.json({
      message: 'Item verified successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resolve item (Mark as resolved)
router.post('/:id/resolve', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Check if user is the poster or is admin
    if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    item.status = 'resolved';
    await item.save();

    res.json({
      message: 'Item marked as resolved',
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search items
router.get('/search/query', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const items = await Item.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { location: new RegExp(q, 'i') },
      ],
    })
      .populate('postedBy', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
