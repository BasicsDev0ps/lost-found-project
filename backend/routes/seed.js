const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Item = require('../models/Item');

const router = express.Router();

// Seed endpoint - call via POST http://localhost:5000/api/seed or GET
router.get('/', async (req, res) => {
  try {
    console.log('🌱 Starting database seed (GET)...');

    // Clear existing data
    await User.deleteMany({});
    await Item.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create sample users
    const user1 = new User({
      name: 'Madhuravani',
      email: 'madhuravani@campus.edu',
      password: 'password123',
      phone: '+91-9876543210',
      role: 'student',
      isVerified: true,
    });
    await user1.save();

    const user2 = new User({
      name: 'Admin User',
      email: 'admin@campus.edu',
      password: 'admin123',
      phone: '+91-9876543211',
      role: 'admin',
      isVerified: true,
    });
    await user2.save();

    const user3 = new User({
      name: 'Raj Kumar',
      email: 'raj@campus.edu',
      password: 'password123',
      phone: '+91-9876543212',
      role: 'staff',
      isVerified: true,
    });
    await user3.save();

    console.log('✓ Created 3 sample users');

    // Create sample items
    const items = [
      {
        title: 'College ID Card',
        description: 'Lost near the library. Brown leather wallet with ID card.',
        category: 'documents',
        type: 'lost',
        location: 'Library',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=ID+Card',
        postedBy: user1._id,
      },
      {
        title: 'Blue Backpack',
        description: 'Found in the cafeteria. Contains notebooks and a calculator.',
        category: 'accessories',
        type: 'found',
        location: 'Cafeteria',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Backpack',
        postedBy: user2._id,
      },
      {
        title: 'Calculator',
        description: 'Lost scientific calculator during exam week.',
        category: 'electronics',
        type: 'lost',
        location: 'Exam Hall',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Calculator',
        postedBy: user1._id,
      },
      {
        title: 'Water Bottle',
        description: 'Found stainless steel water bottle near sports ground.',
        category: 'accessories',
        type: 'found',
        location: 'Sports Ground',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Water+Bottle',
        postedBy: user3._id,
      },
      {
        title: 'Set of Books',
        description: 'Lost physics and math textbooks. Required for semester.',
        category: 'books',
        type: 'lost',
        location: 'Classroom Building',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Books',
        postedBy: user1._id,
      },
      {
        title: 'Laptop Charger',
        description: 'Found Dell laptop charger in computer lab.',
        category: 'electronics',
        type: 'found',
        location: 'Computer Lab',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Laptop',
        postedBy: user2._id,
      },
      {
        title: 'Watch',
        description: 'Lost analog watch near main gate entrance.',
        category: 'accessories',
        type: 'lost',
        location: 'Main Gate',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Watch',
        postedBy: user3._id,
      },
    ];

    await Item.insertMany(items);
    console.log('✓ Created 7 sample items');

    res.json({
      success: true,
      message: '✅ Database seeded successfully!',
      data: {
        users: 3,
        items: 7,
      },
    });
  } catch (error) {
    console.error('❌ Error seeding database (GET):', error);
    res.status(500).json({ error: error.message });
  }
});

// Seed endpoint - call via POST http://localhost:5000/api/seed or GET
router.post('/', async (req, res) => {
  try {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await User.deleteMany({});
    await Item.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create sample users
    const user1 = new User({
      name: 'Madhuravani',
      email: 'madhuravani@campus.edu',
      password: 'password123',
      phone: '+91-9876543210',
      role: 'student',
      isVerified: true,
    });
    await user1.save();

    const user2 = new User({
      name: 'Admin User',
      email: 'admin@campus.edu',
      password: 'admin123',
      phone: '+91-9876543211',
      role: 'admin',
      isVerified: true,
    });
    await user2.save();

    const user3 = new User({
      name: 'Raj Kumar',
      email: 'raj@campus.edu',
      password: 'password123',
      phone: '+91-9876543212',
      role: 'staff',
      isVerified: true,
    });
    await user3.save();

    console.log('✓ Created 3 sample users');

    // Create sample items
    const items = [
      {
        title: 'College ID Card',
        description: 'Lost near the library. Brown leather wallet with ID card.',
        category: 'documents',
        type: 'lost',
        location: 'Library',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=ID+Card',
        postedBy: user1._id,
      },
      {
        title: 'Blue Backpack',
        description: 'Found in the cafeteria. Contains notebooks and a calculator.',
        category: 'accessories',
        type: 'found',
        location: 'Cafeteria',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Backpack',
        postedBy: user2._id,
      },
      {
        title: 'Calculator',
        description: 'Lost scientific calculator during exam week.',
        category: 'electronics',
        type: 'lost',
        location: 'Exam Hall',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Calculator',
        postedBy: user1._id,
      },
      {
        title: 'Water Bottle',
        description: 'Found stainless steel water bottle near sports ground.',
        category: 'accessories',
        type: 'found',
        location: 'Sports Ground',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Water+Bottle',
        postedBy: user3._id,
      },
      {
        title: 'Set of Books',
        description: 'Lost physics and math textbooks. Required for semester.',
        category: 'books',
        type: 'lost',
        location: 'Classroom Building',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Books',
        postedBy: user1._id,
      },
      {
        title: 'Laptop Charger',
        description: 'Found Dell laptop charger in computer lab.',
        category: 'electronics',
        type: 'found',
        location: 'Computer Lab',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Laptop',
        postedBy: user2._id,
      },
      {
        title: 'Watch',
        description: 'Lost analog watch near main gate entrance.',
        category: 'accessories',
        type: 'lost',
        location: 'Main Gate',
        status: 'available',
        image: 'https://via.placeholder.com/400x300?text=Watch',
        postedBy: user3._id,
      },
    ];

    await Item.insertMany(items);
    console.log('✓ Created 7 sample items');

    res.json({
      success: true,
      message: '✅ Database seeded successfully!',
      data: {
        users: 3,
        items: 7,
      },
    });
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
