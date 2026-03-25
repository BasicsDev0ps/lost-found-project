# 🌱 How to Add Sample Data to Your Database

## Quick Start - Add 7 Sample Items (Recommended! ⭐)

Once your backend is running, open a **new terminal** and run:

```bash
cd backend
npm run seed
```

This will:
- ✅ Create 3 sample users
- ✅ Create 3 lost items
- ✅ Create 4 found items
- ✅ Automatically verify all items
- ✅ Clear previous data first

You'll see output like:
```
✓ Connected to MongoDB
✓ Cleared existing data
✓ Created 3 sample users
✓ Created 3 sample lost items
✓ Created 4 sample found items

✅ DATABASE SEEDING COMPLETE!
```

---

## Test Accounts After Seeding

Use these credentials to login:

| Email | Password | Role |
|-------|----------|------|
| madhuravani@campus.edu | password123 | Student |
| admin@campus.edu | admin123 | Admin |
| raj@campus.edu | password123 | Student |

---

## What Gets Added

### 3 Lost Items
1. **Red Backpack** - Accessories - Library, Block A
2. **Student ID Card** - ID Card - Canteen Area  
3. **Physics Textbook** - Books - Classroom Block

### 4 Found Items
1. **Scientific Calculator** - Electronics - Classroom 301
2. **Pink Water Bottle** - Accessories - Parking Lot
3. **Apple AirPods** - Electronics - Library
4. **Car Keys** - Accessories - Main Gate

---

## After Running Seed

1. **Refresh your browser** at http://localhost:8000
2. **Go to "Search Items"**
3. **You should now see all 7 items!** 🎉
4. **Try all features**:
   - Login with test accounts
   - Post new items
   - Search and filter
   - Claim items
   - View dashboard

---

## Manual Data Entry (Alternative)

If you prefer to add data through the UI:

1. **Register a new account** on index.html
2. **Login** with your account
3. **Click "Post Lost Item"** or **"Post Found Item"**
4. **Fill the form** and submit
5. Items will be added to your database!

---

## Reset Database

To clear all data and start fresh:

```bash
npm run seed
```

It automatically clears existing data before adding new samples.

---

## Troubleshooting

**Error: "Cannot find module 'bcryptjs'"**
- Run: `npm install` in backend folder

**Error: "MongoDB connection failed"**
- Make sure MongoDB is running
- Check MongoDB URI in `.env` file

**Items still not showing?**
- Refresh browser (Ctrl+Shift+R)
- Check browser console (F12) for errors
- Make sure backend is running on port 5000

---

## Want to Add More Custom Data?

Edit `backend/seed-data.js` and:

1. Add more users in the users array
2. Add more items in the lost/found items arrays
3. Run `npm run seed` again

Or manually add through the web interface! 🚀

---

**Happy Testing! Now you have real data to work with! 🎓**
