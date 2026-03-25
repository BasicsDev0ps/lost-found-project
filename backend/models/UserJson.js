const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATABASE_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATABASE_DIR, 'users.json');

// Ensure database directory exists
if (!fs.existsSync(DATABASE_DIR)) {
  fs.mkdirSync(DATABASE_DIR, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

class User {
  static getAll() {
    try {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  static findByEmail(email) {
    const users = this.getAll();
    return users.find(u => u.email === email);
  }

  static findById(id) {
    const users = this.getAll();
    return users.find(u => u.id === id);
  }

  static save(user) {
    const users = this.getAll();
    if (!user.id) {
      user.id = Date.now().toString();
    }
    if (!user.createdAt) {
      user.createdAt = new Date();
    }
    
    const existingIndex = users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return user;
  }

  static async create(userData) {
    if (this.findByEmail(userData.email)) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone || '',
      role: userData.role || 'student',
      isVerified: true,
      createdAt: new Date(),
    };

    return this.save(user);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;
