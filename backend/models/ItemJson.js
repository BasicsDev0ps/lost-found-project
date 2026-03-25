const fs = require('fs');
const path = require('path');

const DATABASE_DIR = path.join(__dirname, '../data');
const ITEMS_FILE = path.join(DATABASE_DIR, 'items.json');

// Ensure database directory exists
if (!fs.existsSync(DATABASE_DIR)) {
  fs.mkdirSync(DATABASE_DIR, { recursive: true });
}

// Initialize items file if it doesn't exist
if (!fs.existsSync(ITEMS_FILE)) {
  fs.writeFileSync(ITEMS_FILE, JSON.stringify([], null, 2));
}

class Item {
  static getAll() {
    try {
      const data = fs.readFileSync(ITEMS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  static findById(id) {
    const items = this.getAll();
    return items.find(i => i.id === id);
  }

  static findByFilter(filter) {
    let items = this.getAll();

    if (filter.type) items = items.filter(i => i.type === filter.type);
    if (filter.category) items = items.filter(i => i.category === filter.category);
    if (filter.status) items = items.filter(i => i.status === filter.status);
    if (filter.location) {
      const regex = new RegExp(filter.location, 'i');
      items = items.filter(i => regex.test(i.location));
    }
    if (filter.postedBy) items = items.filter(i => i.postedBy === filter.postedBy);

    return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  static save(item) {
    const items = this.getAll();
    if (!item.id) {
      item.id = Date.now().toString();
    }
    if (!item.createdAt) {
      item.createdAt = new Date();
    }

    const existingIndex = items.findIndex(i => i.id === item.id);
    if (existingIndex >= 0) {
      items[existingIndex] = { ...items[existingIndex], ...item };
    } else {
      items.push(item);
    }

    fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2));
    return items.find(i => i.id === item.id);
  }

  static create(itemData) {
    const item = {
      id: Date.now().toString(),
      title: itemData.title,
      description: itemData.description,
      category: itemData.category,
      type: itemData.type, // 'lost' or 'found'
      location: itemData.location,
      status: itemData.status || 'available', // available, claimed, resolved
      image: itemData.image,
      postedBy: itemData.postedBy,
      claimedBy: itemData.claimedBy || null,
      verifiedBy: itemData.verifiedBy || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.save(item);
  }

  static update(id, updateData) {
    const item = this.findById(id);
    if (!item) throw new Error('Item not found');

    const updated = { ...item, ...updateData, updatedAt: new Date() };
    return this.save(updated);
  }

  static delete(id) {
    const items = this.getAll();
    const filtered = items.filter(i => i.id !== id);
    fs.writeFileSync(ITEMS_FILE, JSON.stringify(filtered, null, 2));
    return true;
  }

  static deleteAllByUser(userId) {
    const items = this.getAll();
    const filtered = items.filter(i => i.postedBy !== userId);
    fs.writeFileSync(ITEMS_FILE, JSON.stringify(filtered, null, 2));
  }

  static claim(itemId, userId) {
    const item = this.findById(itemId);
    if (!item) throw new Error('Item not found');
    if (item.status !== 'available') throw new Error('Item already claimed');

    return this.update(itemId, { claimedBy: userId, status: 'claimed' });
  }

  static verify(itemId, verifiedBy) {
    const item = this.findById(itemId);
    if (!item) throw new Error('Item not found');

    return this.update(itemId, { verifiedBy: verifiedBy, status: 'resolved' });
  }
}

module.exports = Item;
