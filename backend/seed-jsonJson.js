const User = require('./models/UserJson');
const Item = require('./models/ItemJson');

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with JSON storage...');

    // Create sample users
    const user1 = await User.create({
      name: 'Madhuravani',
      email: 'madhuravani@campus.edu',
      password: 'password123',
      phone: '+91-9876543210',
      role: 'student',
    });

    const user2 = await User.create({
      name: 'Admin User',
      email: 'admin@campus.edu',
      password: 'admin123',
      phone: '+91-9876543211',
      role: 'admin',
    });

    const user3 = await User.create({
      name: 'Raj Kumar',
      email: 'raj@campus.edu',
      password: 'password123',
      phone: '+91-9876543212',
      role: 'staff',
    });

    console.log('✓ Created 3 sample users');

    // Sample items with images
    const items = [
      {
        title: '📚 Physics Textbook',
        description: 'Lost near the library. Physics textbook with blue cover and notes inside.',
        category: 'books',
        type: 'lost',
        location: 'Library',
        status: 'available',
        image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%234A5568%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23FFFFFF%22 text-anchor=%22middle%22 dy=%22.3em%22%3E📚 Physics Textbook%3C/text%3E%3C/svg%3E',
        postedBy: user1.id,
      },
      {
        title: '🎒 Red Backpack',
        description: 'Found in the cafeteria with a name tag. Contains notebooks and pens.',
        category: 'accessories',
        type: 'found',
        location: 'Cafeteria',
        status: 'available',
        image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23DC2626%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23FFFFFF%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🎒 Red Backpack%3C/text%3E%3C/svg%3E',
        postedBy: user2.id,
      },
      {
        title: '⌚ Silver Watch',
        description: 'Lost expensive silver watch near sports ground during practice.',
        category: 'accessories',
        type: 'lost',
        location: 'Sports Ground',
        status: 'available',
        image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23C0C0C0%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23000000%22 text-anchor=%22middle%22 dy=%22.3em%22%3E⌚ Silver Watch%3C/text%3E%3C/svg%3E',
        postedBy: user3.id,
      },
      {
        title: '💻 Dell Charger',
        description: 'Found Dell laptop charger in computer lab. Black with Dell logo.',
        category: 'electronics',
        type: 'found',
        location: 'Computer Lab',
        status: 'available',
        image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23111827%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23FFFFFF%22 text-anchor=%22middle%22 dy=%22.3em%22%3E💻 Dell Charger%3C/text%3E%3C/svg%3E',
        postedBy: user1.id,
      },
      {
        title: '🎓 Student ID Card',
        description: 'Lost brown leather wallet with student ID and documents.',
        category: 'documents',
        type: 'lost',
        location: 'Library Entrance',
        status: 'claimed',
        claimedBy: user2.id,
        image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%238B5A2B%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23FFFFFF%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🎓 Student ID%3C/text%3E%3C/svg%3E',
        postedBy: user2.id,
      },
      {
        title: '🔑 Bottle of Keys',
        description: 'Found set of keys in hostel with key chain.',
        category: 'accessories',
        type: 'found',
        location: 'Hostel',
        status: 'resolved',
        claimedBy: user3.id,
        image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23FBBF24%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23000000%22 text-anchor=%22middle%22 dy=%22.3em%22%3E🔑 Set of Keys%3C/text%3E%3C/svg%3E',
        postedBy: user1.id,
      },
      {
        title: '📱 Apple AirPods Pro',
        description: 'Lost expensive AirPods Pro in white carrying case near exam hall.',
        category: 'electronics',
        type: 'lost',
        location: 'Exam Hall',
        status: 'available',
        image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23FFFFFF%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23000000%22 text-anchor=%22middle%22 dy=%22.3em%22%3E📱 AirPods Pro%3C/text%3E%3C/svg%3E',
        postedBy: user3.id,
      },
      {
        title: '💧 Water Bottle',
        description: 'Found blue stainless steel water bottle with campus logo.',
        category: 'accessories',
        type: 'found',
        location: 'Classroom Building',
        status: 'available',
        image: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%230EA5E9%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2224%22 fill=%22%23FFFFFF%22 text-anchor=%22middle%22 dy=%22.3em%22%3E💧 Water Bottle%3C/text%3E%3C/svg%3E',
        postedBy: user2.id,
      },
    ];

    for (const item of items) {
      Item.create(item);
    }

    console.log(`✓ Created ${items.length} sample items`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('  📧 Student: madhuravani@campus.edu / password123');
    console.log('  📧 Admin: admin@campus.edu / admin123');
    console.log('  📧 Staff: raj@campus.edu / password123');
    console.log('\n🎲 Sample Items:');
    console.log('  - 4 Lost Items (Available to claim)');
    console.log('  - 3 Found Items (Ready to return)');
    console.log('  - 2 Claimed/Resolved Items (Examples)');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

seedDatabase();
