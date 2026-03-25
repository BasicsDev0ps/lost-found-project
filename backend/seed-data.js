const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Item = require('./models/Item');

// Sample image URLs
const PLACEHOLDER_IMAGES = [
  'https://via.placeholder.com/400x300?text=ID+Card',
  'https://via.placeholder.com/400x300?text=Backpack',
  'https://via.placeholder.com/400x300?text=Calculator',
  'https://via.placeholder.com/400x300?text=Water+Bottle',
  'https://via.placeholder.com/400x300?text=Books',
  'https://via.placeholder.com/400x300?text=Laptop',
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Connected to MongoDB');

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
      role: 'student',
      isVerified: true,
    });
    await user3.save();

    console.log('✓ Created 3 sample users');

    // Create sample lost items
    const lostItems = [
      {
        title: 'Red Backpack',
        description: 'Red backpack with laptop compartment and water bottle holder. Contains important books and notebooks. Lost on 25th March.',
        category: 'accessories',
        type: 'lost',
        location: 'Library, Block A',
        foundDate: new Date('2024-03-23'),
        image: PLACEHOLDER_IMAGES[1],
        status: 'available',
        postedBy: user1._id,
        isVerified: true,
        verifiedBy: user2._id,
      },
      {
        title: 'Student ID Card (23BCA001)',
        description: 'Blue student ID card with photo. Name: Raj Kumar. Very important document.',
        category: 'idCard',
        type: 'lost',
        location: 'Canteen Area',
        foundDate: new Date('2024-03-20'),
        image: PLACEHOLDER_IMAGES[0],
        status: 'available',
        postedBy: user1._id,
        isVerified: true,
        verifiedBy: user2._id,
      },
      {
        title: 'Physics Textbook',
        description: 'Class 12 Physics textbook (NCERT). Blue cover with stickers. Very urgent needed for exam preparation.',
        category: 'books',
        type: 'lost',
        location: 'Classroom Block, Room 301',
        foundDate: new Date('2024-03-22'),
        image: PLACEHOLDER_IMAGES[4],
        status: 'available',
        postedBy: user3._id,
        isVerified: true,
        verifiedBy: user2._id,
      },
    ];

    await Item.insertMany(lostItems);
    console.log('✓ Created 3 sample lost items');

    // Create sample found items
    const foundItems = [
      {
        title: 'Scientific Calculator',
        description: 'Black Casio calculator with battery. Found in classroom 301. In perfect working condition.',
        category: 'calculator',
        type: 'found',
        location: 'Classroom Block, Room 301',
        foundDate: new Date('2024-03-24'),
        image: PLACEHOLDER_IMAGES[2],
        status: 'available',
        postedBy: user2._id,
        isVerified: true,
        verifiedBy: user2._id,
      },
      {
        title: 'Pink Water Bottle',
        description: 'Pink water bottle with name "Priya" written on it. Found near the parking lot with some water inside.',
        category: 'waterBottle',
        type: 'found',
        location: 'Parking Lot',
        foundDate: new Date('2024-03-25'),
        image: PLACEHOLDER_IMAGES[3],
        status: 'available',
        postedBy: user2._id,
        isVerified: true,
        verifiedBy: user2._id,
      },
      {
        title: 'Apple AirPods',
        description: 'White Apple AirPods with charging case. Found in the library near the reading section. Still has battery.',
        category: 'electronics',
        type: 'found',
        location: 'Library, Main Hall',
        foundDate: new Date('2024-03-24'),
        image: PLACEHOLDER_IMAGES[5],
        status: 'available',
        postedBy: user2._id,
        isVerified: true,
        verifiedBy: user2._id,
      },
      {
        title: 'Car Keys',
        description: 'Silver car keys with blue key chain. Found near the main gate of campus. Key number visible on the keychain.',
        category: 'accessories',
        type: 'found',
        location: 'Main Gate',
        foundDate: new Date('2024-03-23'),
        image: PLACEHOLDER_IMAGES[1],
        status: 'available',
        postedBy: user2._id,
        isVerified: true,
        verifiedBy: user2._id,
      },
    ];

    await Item.insertMany(foundItems);
    console.log('✓ Created 4 sample found items');

    console.log('\n✅ DATABASE SEEDING COMPLETE!\n');
    console.log('Sample Users Created:');
    console.log('  1. Madhuravani (madhuravani@campus.edu) - password: password123');
    console.log('  2. Admin User (admin@campus.edu) - password: admin123');
    console.log('  3. Raj Kumar (raj@campus.edu) - password: password123');
    console.log('\n✓ 3 Lost Items added');
    console.log('✓ 4 Found Items added');
    console.log('\nTotal: 7 items are now visible in the application!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
