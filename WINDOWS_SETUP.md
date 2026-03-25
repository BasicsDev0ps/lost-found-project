# Windows Setup Instructions

## Step 1: Prerequisites

1. **Install Node.js**
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - Install with all default options

2. **Install MongoDB**
   - Option A: MongoDB Local
     - Download: https://www.mongodb.com/try/download/community
     - Run installer and follow setup
     - MongoDB will run on `localhost:27017`
   
   - Option B: MongoDB Atlas (Cloud - Recommended)
     - Go to https://www.mongodb.com/cloud/atlas
     - Create a free account
     - Create a cluster
     - Get connection string

3. **Verify Installation**
   ```
   Open Command Prompt and run:
   node --version
   npm --version
   ```

## Step 2: Backend Setup

1. **Open Command Prompt/PowerShell**
   - Navigate to the project folder:
     ```
     cd "C:\Users\Chirag Jain\Documents\lost-found-project\backend"
     ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Create .env File**
   - Copy `.env.example` to `.env`
   - Edit `.env` and add your MongoDB details:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/lost-found
     JWT_SECRET=your_secret_key_here
     NODE_ENV=development
     ```
   
   For MongoDB Atlas, use:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lost-found
   ```

4. **Start Backend Server**
   ```
   npm start
   ```
   
   You should see:
   ```
   Server is running on http://localhost:5000
   MongoDB connected successfully
   ```

## Step 3: Frontend Setup

1. **Option A: Using Python's HTTP Server** (Recommended)
   - Open new Command Prompt
   - Navigate to frontend folder:
     ```
     cd "C:\Users\Chirag Jain\Documents\lost-found-project\frontend"
     ```
   - Run:
     ```
     python -m http.server 8000
     ```
   - Open browser and go to: `http://localhost:8000`

2. **Option B: Using Live Server Extension** (VS Code)
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

3. **Option C: Direct File**
   - Simply open `frontend/index.html` in your browser
   - File will work but some features might be limited

## Step 4: Testing the Application

1. **Register a New Account**
   - Click "Register"
   - Fill in details and create account
   - You'll be logged in automatically

2. **Post a Lost Item**
   - Click "Post Lost Item"
   - Fill in all details
   - Click "Post Lost Item"

3. **Search for Items**
   - Go to "Search Items"
   - Use filters to find items
   - Click on an item to view details

4. **Claim an Item**
   - Click on any found item
   - Click "Claim This Item"
   - The item will be marked as claimed

## Troubleshooting

### MongoDB Connection Error
**Problem:** `MongoError: connect ECONNREFUSED`

**Solution:**
- Make sure MongoDB is running
- Check your connection string in .env
- For local: `mongodb://localhost:27017/lost-found`
- For Atlas: Update username/password and cluster details

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
- Change PORT in `.env` file (e.g., 5001)
- Or kill the process using port 5000:
  ```
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### CORS Error
**Problem:** `Cross-Origin Request Blocked`

**Solution:**
- Make sure backend is running on `http://localhost:5000`
- Check frontend is accessing correct API URL

### Frontend Pages Not Loading
**Problem:** Blank page or 404 error

**Solution:**
- Make sure you're using a proper HTTP server (not file://)
- Use: `python -m http.server 8000` in frontend folder
- Don't open HTML files directly in browser

## Files Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Configuration (CREATE THIS)
├── models/
│   ├── User.js
│   ├── Item.js
│   └── Notification.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   └── items.js
└── middleware/
    └── auth.js

frontend/
├── index.html             # Home page
├── login.html
├── register.html
├── search.html
├── post-lost.html
├── post-found.html
├── dashboard.html
├── item-details.html
├── css/
│   └── styles.css
└── js/
    ├── main.js
    ├── auth.js
    ├── navbar.js
    ├── post-item.js
    ├── search.js
    ├── dashboard.js
    └── item-details.js
```

## Default MongoDB Database Name

The project uses database: **lost-found**

Collections created:
- `users` - Store user accounts
- `items` - Store lost/found items
- `notifications` - Store notifications (for future use)

## Feature Checklist

- [x] User Registration & Login
- [x] Post Lost Items
- [x] Post Found Items
- [x] Search & Filter Items
- [x] Item Details View
- [x] Claim Found Items
- [x] Mark Items as Resolved
- [x] User Dashboard
- [x] Profile Management
- [x] CRUD Operations

## API Testing

You can test the API using Postman:

1. **Register User**
   ```
   POST http://localhost:5000/api/auth/register
   Body: {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123",
     "phone": "+91-9876543210"
   }
   ```

2. **Login**
   ```
   POST http://localhost:5000/api/auth/login
   Body: {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Get All Items**
   ```
   GET http://localhost:5000/api/items
   ```

4. **Create Item**
   ```
   POST http://localhost:5000/api/items
   Header: Authorization: Bearer <token>
   Body: {
     "title": "Lost Backpack",
     "description": "Red backpack with laptop",
     "category": "accessories",
     "type": "lost",
     "location": "Library",
     "foundDate": "2024-01-20",
     "image": "https://url-to-image.jpg"
   }
   ```

## Support Resources

- **MongoDB Docs:** https://docs.mongodb.com/
- **Express Docs:** https://expressjs.com/
- **Node.js Docs:** https://nodejs.org/docs/
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas

---

## Quick Command Reference

```bash
# Backend
cd backend
npm install           # Install dependencies
npm start            # Start server
npm run dev          # Start with auto-reload (if nodemon installed)

# Frontend (in different terminal)
cd frontend
python -m http.server 8000

# View Logs
# Backend logs will show in terminal
# Frontend errors will show in browser console (F12)
```

**Happy Coding! 🚀**
