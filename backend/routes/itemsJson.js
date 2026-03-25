const express = require('express');
const Item = require('../models/ItemJson');
const User = require('../models/UserJson');
const { authMiddleware, adminMiddleware } = require('../middleware/authJson');

const router = express.Router();

// Get all items (with filters)
router.get('/', (req, res) => {
  try {
    const { type, category, status, location } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (location) filter.location = location;

    const items = Item.findByFilter(filter);

    // Enrich items with user data
    const enrichedItems = items.map(item => ({
      ...item,
      postedByUser: User.findById(item.postedBy),
      claimedByUser: item.claimedBy ? User.findById(item.claimedBy) : null,
    }));

    res.json(enrichedItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get item by ID
router.get('/:id', (req, res) => {
  try {
    const item = Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const itemWithUser = {
      ...item,
      postedByUser: User.findById(item.postedBy),
      claimedByUser: item.claimedBy ? User.findById(item.claimedBy) : null,
    };

    res.json(itemWithUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create item (requires authentication)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, description, category, type, location, image } = req.body;

    if (!title || !description || !category || !type || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const item = Item.create({
      title,
      description,
      category,
      type,
      location,
      image,
      postedBy: req.userId,
    });

    res.status(201).json({
      message: 'Item created successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update item (only creator or admin)
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const item = Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.postedBy !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this item' });
    }

    const updated = Item.update(req.params.id, req.body);
    res.json({
      message: 'Item updated successfully',
      item: updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete item (only creator or admin)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const item = Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (item.postedBy !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this item' });
    }

    Item.delete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Claim item
router.post('/:id/claim', authMiddleware, (req, res) => {
  try {
    const item = Item.claim(req.params.id, req.userId);
    res.json({
      message: 'Item claimed successfully',
      item,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Verify/Resolve item (marking as found/returned)
router.post('/:id/verify', authMiddleware, (req, res) => {
  try {
    const item = Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Only poster or admin can verify
    if (item.postedBy !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const verified = Item.verify(req.params.id, req.userId);
    res.json({
      message: 'Item verified and resolved',
      item: verified,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search items
router.get('/search/query/:q', (req, res) => {
  try {
    const query = req.params.q;
    const allItems = Item.getAll();

    const filtered = allItems.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
