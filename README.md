# Campus Lost & Found Portal

A comprehensive web-based platform where college students can post lost or found items and help each other recover their belongings.

## 🎯 Project Overview

The Campus Lost & Found Portal is designed to address the problem of students losing important items on campus. It provides an easy-to-use interface for:

- **Posting Lost Items**: Report lost items with detailed descriptions and locations
- **Posting Found Items**: Help others by reporting found items
- **Searching Items**: Browse and search for lost or found items by category, location, or description
- **Item Tracking**: Track the status of your posted items
- **Admin Verification**: Admin can verify posts to ensure legitimacy
- **User Dashboard**: Personal dashboard to manage your items and profile

## 📋 Features

### For Users
- ✅ User Registration & Login
- ✅ Post Lost Items
- ✅ Post Found Items
- ✅ Search & Filter Items
- ✅ Item Details View
- ✅ Claim Found Items
- ✅ Mark Items as Resolved
- ✅ User Dashboard
- ✅ Profile Management
- ✅ Contact Information Display

### For Admin
- ✅ Verify Posted Items
- ✅ Manage All Items
- ✅ User Management
- ✅ Dashboard Analytics

### Technical Features
- ✅ CRUD Operations for All Resources
- ✅ JWT Authentication
- ✅ Role-Based Access Control
- ✅ Input Validation
- ✅ Error Handling
- ✅ Responsive Design
- ✅ RESTful API

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Responsive Design)
- JavaScript (Vanilla)
- Fetch API for Backend Communication

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT for Authentication
- bcryptjs for Password Hashing

### Database
- MongoDB

## 📁 Project Structure

```
lost-found-project/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── items.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── SAMPLE_DATA.md
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── search.html
│   ├── post-lost.html
│   ├── post-found.html
│   ├── dashboard.html
│   ├── item-details.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── auth.js
│   │   ├── navbar.js
│   │   ├── post-item.js
│   │   ├── search.js
│   │   ├── dashboard.js
│   │   └── item-details.js
│   └── assets/
│       └── images/
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Cloud)
- NPM or Yarn

### Backend Setup

1. **Clone the repository** (if using Git)
   ```bash
   cd lost-found-project/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   copy .env.example .env
   ```

4. **Update MongoDB Connection**
   Edit `.env` and add your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/lost-found
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lost-found
   ```

5. **Update JWT Secret** (Optional but recommended)
   ```
   JWT_SECRET=your_secret_key_here
   ```

6. **Start the server**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Open frontend files in a browser or local server**
   ```bash
   # Simple way - using Python
   cd frontend
   python -m http.server 8000
   
   # Or using Live Server extension in VS Code
   ```

2. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/profile/me` - Get current user profile
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Items
- `GET /api/items` - Get all items (with filters)
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `POST /api/items/:id/claim` - Claim an item
- `POST /api/items/:id/verify` - Verify item (Admin)
- `POST /api/items/:id/resolve` - Mark item as resolved
- `GET /api/items/search/query` - Search items

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer your_token_here
```

Tokens are obtained through login and stored in localStorage on the frontend.

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (student, admin, staff),
  profilePicture: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Item Model
```javascript
{
  title: String,
  description: String,
  category: String,
  type: String (lost/found),
  location: String,
  foundDate: Date,
  image: String,
  status: String (available, claimed, resolved),
  postedBy: ObjectId (User),
  claimedBy: ObjectId (User),
  claimDate: Date,
  isVerified: Boolean,
  verifiedBy: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing the Application

1. **Register a new account** on the registration page
2. **Create a lost item** from the "Post Lost Item" page
3. **Search for items** and view details
4. **Try the filters** to search by category, location, type, status
5. **Claim an item** as another user
6. **Manage your items** from the dashboard

## 📝 Sample Data

Sample data is provided in `backend/SAMPLE_DATA.md`. Follow the instructions to import sample items for testing.

## 🎨 Frontend Pages

| Page | Purpose |
|------|---------|
| `index.html` | Home page with recent items |
| `login.html` | User login |
| `register.html` | User registration |
| `search.html` | Search and filter items |
| `post-lost.html` | Post a lost item |
| `post-found.html` | Post a found item |
| `dashboard.html` | User dashboard |
| `item-details.html` | Detailed view of an item |

## ⚙️ Configuration

Edit these files to customize:

1. **Backend Configuration** - `.env` file
   - `PORT` - Server port (default: 5000)
   - `MONGODB_URI` - Database connection
   - `JWT_SECRET` - JWT signing key

2. **Frontend Configuration** - `js/main.js`
   - `API_URL` - Backend API URL

3. **Styling** - `css/styles.css`
   - Colors, fonts, and layouts

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP address

### CORS Error
- CORS is enabled in `server.js`
- Check if frontend URL matches allowed origins

### 404 Not Found
- Ensure backend is running on correct port
- Check API endpoints match documentation

## 📞 Support

For issues or questions:
1. Check the API documentation in this README
2. Review error messages in browser console
3. Check backend logs for server errors

## 📄 License

This project is open source and available for educational purposes.

## 👥 Authors

- **Madhuravani** (23BCA___)
- Campus Lost & Found Portal - Educational Project

---

**Note**: Remember to update your MongoDB details in the `.env` file before running the application. Visit the application at `http://localhost:8000` (or the port you configured).
