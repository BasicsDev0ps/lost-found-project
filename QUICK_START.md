# 🚀 QUICK START - Campus Lost & Found Portal

## ✅ System Status
- **Backend:** ✅ Running on `http://localhost:5000`
- **Database:** ✅ JSON Storage (No MongoDB needed)
- **Sample Data:** ✅ 8 Items + 3 Pre-loaded Users

---

## 🎯 Start Testing in 2 Minutes

### **Step 1: Open Home Page**
```
http://localhost:5000/index.html
```
You should see the Lost & Found portal with recent items.

### **Step 2: Login**
```
http://localhost:5000/login.html
```
**Enter these credentials:**
- Email: `madhuravani@campus.edu`
- Password: `password123`

✅ Click Login

### **Step 3: Browse Items**
```
http://localhost:5000/search.html
```
✅ You should see 8 sample items
✅ Try filtering by type (Lost/Found)
✅ Click on an item to see details

### **Step 4: Post a Lost Item** ⭐
```
http://localhost:5000/post-lost.html
```
Fill in:
- **Title:** `My Lost Keys`
- **Description:** `Lost near the main gate`
- **Category:** `Accessories`
- **Location:** `Main Gate`

✅ Click "Post Lost Item"

### **Step 5: Search Again**
Go back to search page - your new item should appear!

---

## 🔐 All Test Accounts

| Email | Password | Role |
|-------|----------|------|
| madhuravani@campus.edu | password123 | Student |
| raj@campus.edu | password123 | Staff |
| admin@campus.edu | admin123 | Admin |

---

## 🎲 Sample Items Included

✅ Physics Textbook (Lost) - Available
✅ Red Backpack (Found) - Available  
✅ Silver Watch (Lost) - Available
✅ Dell Charger (Found) - Available
✅ Student ID Card (Lost) - **Claimed**
✅ Set of Keys (Found) - **Resolved**
✅ AirPods Pro (Lost) - Available
✅ Water Bottle (Found) - Available

---

## 📋 All Pages to Test

| Page | URL | Status |
|------|-----|--------|
| Home | `/index.html` | ✅ Ready |
| Login | `/login.html` | ✅ Ready |
| Register | `/register.html` | ✅ Ready |
| Search | `/search.html` | ✅ Ready |
| Post Lost | `/post-lost.html` | ✅ Ready |
| Post Found | `/post-found.html` | ✅ Ready |
| Dashboard | `/dashboard.html` | ✅ Ready |
| Item Details | Click any item | ✅ Ready |

---

## ✅ Features Working

✅ User Registration (creates new account)  
✅ Login with JWT tokens  
✅ Post Lost Items (requires login)  
✅ Post Found Items (requires login)  
✅ Search & Filter Items  
✅ Claim Items (mark as claimed)  
✅ Resolve Items (mark as returned)  
✅ User Dashboard (view your items)  
✅ Image Upload (stores as base64)  
✅ Responsive Design (mobile-friendly)

---

## 🔧 Backend API

All requests go to: `http://localhost:5000/api`

**Available Endpoints:**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /items` - Get all items
- `POST /items` - Create item (requires auth)
- `GET /items/:id` - Get specific item
- `POST /items/:id/claim` - Claim item (requires auth)
- `POST /items/:id/verify` - Resolve item (requires auth)

---

## 🎨 Frontend Pages

### **index.html**
- Welcome page
- Shows recent found items
- Call-to-action buttons

### **search.html**
- Browse all items
- Filter by: Type, Category, Status, Location
- Click item to see details
- Claim button for available items

### **post-lost.html**
- Form to report lost items
- Upload photo (optional)
- Category selector
- Location input

### **post-found.html**
- Form to report found items
- Same fields as post-lost

### **dashboard.html**
- View your posted items
- View items you've claimed
- Update profile

### **item-details.html**
- Full item details
- Claim/Resolve buttons
- Contact info of poster/claimer

---

## 💾 Data Storage

All data stored in JSON files (no database):
- **Users:** `backend/data/users.json`
- **Items:** `backend/data/items.json`

Files auto-created on first run.

---

## 🧪 Quick Test Script

**Test Login:**
1. Go to login page
2. Email: `madhuravani@campus.edu`
3. Password: `password123`
4. ✅ Should show "Login successful" and redirect

**Test Post Item:**
1. Go to post-lost page (after login!)
2. Fill all fields
3. Click "Post Lost Item"
4. ✅ Should show success message
5. Check search page - item should appear

**Test Claim:**
1. Go to search page
2. Click on a "Found" item
3. Click "Claim This Item"
4. ✅ Should claim successfully

---

## ❌ If Something Doesn't Work

1. **Refresh page:** `Ctrl+R`
2. **Clear cache:** `Ctrl+Shift+R`
3. **Check console:** `F12` > Console tab
4. **Check if logged in:** Look for "user" dropdown in navbar
5. **Clear storage:** `F12` > Application > LocalStorage > Clear All

---

## 🎯 Success Criteria

✅ Can login with test account  
✅ Can see 8 sample items  
✅ Can post a new item  
✅ Can claim an item  
✅ Can view dashboard  
✅ Can search & filter  
✅ No errors in console  

---

**You're all set! Start testing now! 🚀**
