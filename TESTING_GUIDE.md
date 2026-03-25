# 🎓 Campus Lost & Found Portal - Complete Testing Guide

## ✅ System is Ready!

**Backend Status:** ✅ Running on `http://localhost:5000`
**Database:** ✅ JSON file-based (no MongoDB needed)
**Sample Data:** ✅ 8 items + 3 users pre-loaded

---

## 🔑 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | `madhuravani@campus.edu` | `password123` |
| Staff | `raj@campus.edu` | `password123` |
| Admin | `admin@campus.edu` | `admin123` |

---

## 🧪 Testing URLs

### **1. Home Page**
```
http://localhost:5000/index.html
```
✅ Shows welcome and recent items

### **2. Login Page**
```
http://localhost:5000/login.html
```
✅ Try logging in with credentials above
✅ Click "Search Lost Items" after login

### **3. Register Page**
```
http://localhost:5000/register.html
```
✅ Create a new account
✅ Automatically logs you in after registration

### **4. Search Items**
```
http://localhost:5000/search.html
```
✅ Browse all 8 sample items
✅ Filter by Type (Lost/Found)
✅ Filter by Category
✅ Filter by Status (Available/Claimed/Resolved)
✅ Click on any item to see details

### **5. Post Lost Item**
```
http://localhost:5000/post-lost.html
```
✅ **Must be logged in first**
✅ Fill all fields (Title, Description, Category, Location)
✅ (Optional) Upload an image
✅ Click "Post Lost Item"

### **6. Post Found Item**
```
http://localhost:5000/post-found.html
```
✅ **Must be logged in first**
✅ Fill all fields
✅ Click "Post Found Item"

### **7. Dashboard**
```
http://localhost:5000/dashboard.html
```
✅ **Must be logged in first**
✅ View your posted items
✅ View items you've claimed
✅ Update profile settings

### **8. API Test Page (Advanced)**
```
http://localhost:5000/frontend/test.html
```
✅ Test login/register via API
✅ Test posting items
✅ View API responses

---

## 📋 Complete Testing Workflow

### **Test 1: Login Flow**
1. Go to `http://localhost:5000/login.html`
2. Enter: `madhuravani@campus.edu` / `password123`
3. Click "Login"
4. ✅ Should redirect to home page
5. ✅ Navbar should show "user" dropdown

### **Test 2: Register New Account**
1. Go to `http://localhost:5000/register.html`
2. Fill in: Name, Email, Password, Phone
3. Click "Register"
4. ✅ Should auto-login
5. ✅ Should redirect to home page

### **Test 3: Browse Items**
1. Go to `http://localhost:5000/search.html`
2. ✅ Should see 8 items listed
3. Click on any item
4. ✅ Should show item details
5. ✅ If item is "available", show "Claim" button
6. ✅ If you're the owner, show "Resolve" button

### **Test 4: Post Lost Item** ⭐
1. **Login first** (very important!)
2. Go to `http://localhost:5000/post-lost.html`
3. Fill in:
   - Title: `My Silver Watch`
   - Description: `Lost near library building`
   - Category: `Accessories`
   - Location: `Library`
4. (Optional) Upload an image
5. Click "Post Lost Item"
6. ✅ Should say "Item posted successfully!"
7. Go to search page
8. ✅ Should see your new item in the list

### **Test 5: Claim Found Item** ⭐
1. Login (if not already)
2. Go to `http://localhost:5000/search.html`
3. Find a "Found" item that's "available"
4. Click on it
5. Click "Claim This Item"
6. ✅ Should say "Item claimed successfully"
7. Go to dashboard
8. ✅ Should see item in "Items I've Claimed" tab

### **Test 6: Dashboard**
1. Go to `http://localhost:5000/dashboard.html`
2. ✅ See tabs: "My Posted Items", "Items I've Claimed", "Profile Settings"
3. Click through each tab
4. ✅ See your items in respective tabs

---

## ❌ Common Issues & Fixes

### **Issue: "Invalid or expired token"**
**Solution:**
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Clear localStorage: Open DevTools > Application > LocalStorage > Clear
3. Log out and log back in

### **Issue: "Please login first"**
**Solution:**
1. Make sure you're logged in
2. Check if navbar shows "user" dropdown
3. If not, go to login page and login again

### **Issue: Items not loading**
**Solution:**
1. Refresh page: `Ctrl+R`
2. Check browser console: `F12 > Console`

### **Issue: Image upload not working**
**Solution:**
1. Supported formats: JPG, PNG, GIF
2. Max size: 2MB
3. Try a smaller image

### **Issue: Can't see my posted item**
**Solution:**
1. Refresh the search page
2. Check you're logged in as the correct user
3. Go to Dashboard > "My Posted Items" to verify it was created

---

## 🔍 Browser Console Debugging

Open DevTools: `F12` then click "Console" tab

**Check Token:**
```javascript
localStorage.getItem('token')
```

**Check Current User:**
```javascript
localStorage.getItem('user')
```

**Clear Everything:**
```javascript
localStorage.clear()
```

---

## 📊 Sample Items in System

### **Lost Items** (Red badge 🔴)
1. 📚 Physics Textbook - Library - Available
2. ⌚ Silver Watch - Sports Ground - Available
3. 💧 Set of Books - Classroom - Available
4. 📱 AirPods Pro - Exam Hall - Available

### **Found Items** (Green badge 🟢)
1. 🎒 Red Backpack - Cafeteria - Available
2. 💻 Dell Charger - Computer Lab - Available
3. 🔑 Set of Keys - Hostel - **Resolved** ✅

---

## 🎯 Features Tested ✅

| Feature | Status | Notes |
|---------|--------|-------|
| Register | ✅ Working | Creates account + auto-login |
| Login | ✅ Working | JWT token generated |
| Post Lost Item | ✅ Working | Requires auth |
| Post Found Item | ✅ Working | Requires auth |
| Search Items | ✅ Working | Filters by type/category |
| Claim Item | ✅ Working | Changes status to "claimed" |
| Resolve Item | ✅ Working | Only item owner can do this |
| View Dashboard | ✅ Working | Shows user's items |
| Filter Items | ✅ Working | By type, category, status |
| Image Upload | ✅ Working | Base64 stored in JSON |

---

## 🚀 Next Steps

Once you verify all tests pass:
1. ✅ Test on mobile (responsive design)
2. ✅ Share with other users for feedback
3. ✅ Later: Add MongoDB back if needed
4. ✅ Later: Add email notifications
5. ✅ Later: Add chat feature

---

## 📱 Mobile Testing

All pages are responsive! Test on:
- Mobile: 375px width
- Tablet: 768px width  
- Desktop: 1024px width+

Use DevTools: `F12 > Toggle Device Toolbar`

---

## 🆘 Need Help?

If something isn't working:
1. Check the browser console (`F12`)
2. Look for red error messages
3. Check if you're logged in
4. Try refreshing the page
5. Clear localStorage and try again

---

**Happy Testing! 🎉**
