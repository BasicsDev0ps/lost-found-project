# 🔧 Troubleshooting Guide - Campus Lost & Found

## ❌ Issue 1: "Invalid or expired token" Error

### **What it means:**
Your JWT token is invalid or expired when trying to post an item or access protected features.

### **Solutions:**

**Solution 1: Clear Browser Storage (BEST FIX)**
1. Open DevTools: Press `F12`
2. Go to "Application" tab
3. Click "Local Storage" on left
4. Click `http://localhost:5000`
5. Delete all items
6. Refresh page
7. **Login again**

**Solution 2: Logout and Login Again**
1. Click "Logout" in navbar
2. Go to login page
3. Enter credentials again
4. Try posting item

**Solution 3: Check if You're Logged In**
1. Look at navbar (top right)
2. Should see "user" dropdown (if logged in)
3. If just see "Login/Register", you're NOT logged in
4. Go to login page and log in

**Solution 4: Token Might Be Corrupted**
1. Open DevTools: `F12`
2. Go to Console tab
3. Type: `localStorage.clear()`
4. Press Enter
5. Refresh page
6. Login again

---

## ❌ Issue 2: "Please login first" When Posting

### **What it means:**
The system doesn't recognize you as logged in when you try to post an item.

### **Solutions:**

**Check 1: Are you actually logged in?**
1. Look at top-right of page
2. If you see "Login" button → **You're NOT logged in**
3. If you see "user" dropdown → **You ARE logged in**

**Fix:**
1. Click "Login" button
2. Email: `madhuravani@campus.edu`
3. Password: `password123`
4. Click Login

**Check 2: Token Missing**
1. Open DevTools: `F12`
2. Go to Console
3. Type: `localStorage.getItem('token')`
4. Press Enter
5. If it says `null` → **Token not saved**

**Fix:**
1. Login again
2. Wait for page to redirect to home
3. Check token again

**Check 3: Token Expired**
1. Open DevTools: `F12`
2. Go to Console
3. Type: `localStorage.getItem('token')`
4. You'll see a very long string starting with "eyJ..."
5. If older than 24 hours → **Token expired**

**Fix:**
1. Logout
2. Login again

---

## ❌ Issue 3: Search Not Loading Properly

### **What it means:**
The search page is loading but items aren't showing, or filters aren't working.

### **Solutions:**

**Solution 1: Refresh Page**
1. Just press `F5` or `Ctrl+R`
2. Page should reload and load items

**Solution 2: Check Console for Errors**
1. Open DevTools: `F12`
2. Click "Console" tab
3. Look for red error messages
4. Screenshot the error and send it for help

**Solution 3: Check if Backend is Running**
1. Open new tab
2. Go to `http://localhost:5000/api`
3. You should see: `{"message":"Campus Lost & Found API is running (JSON Storage)"}`
4. If not → **Backend crashed**, restart it

**Solution 4: Clear Cache**
1. Press `Ctrl+Shift+R` (hard refresh)
2. This clears browser cache and reloads everything

**Solution 5: Check API Response**
1. Open DevTools: `F12`
2. Go to "Network" tab
3. Go to search page
4. Look for a request to `/api/items`
5. Click on it, check the "Response" tab
6. Should show a list of items (JSON array)

---

## ❌ Issue 4: Can't Post Items

### **What it means:**
When you try to post an item, you get an error message.

### **Checklist:**

✅ **1. Are you logged in?**
- Navbar should show "user" dropdown
- If not, login first

✅ **2. Did you fill all fields?**
- Title (required)
- Description (required)
- Category (required)
- Location (required)

✅ **3. Is image file too large?**
- Max size: 2MB
- Supported: JPG, PNG, GIF
- Try a smaller image

✅ **4. Check for error message**
- Read the error text carefully
- It will tell you what's wrong

**Common Error Messages:**

| Error | Cause | Fix |
|-------|-------|-----|
| "No token provided" | Not logged in | Login first |
| "Invalid or expired token" | Token expired | Logout, login again |
| "All fields are required" | Missing a field | Fill all fields |
| "Failed to post item" | Server error | Restart backend |

---

## ❌ Issue 5: Item Not Appearing After Posting

### **What it means:**
You posted an item but it doesn't show in search results.

### **Solutions:**

**Solution 1: Refresh Search Page**
1. Go to search page
2. Press `Ctrl+R`
3. Wait for page to load completely
4. Scroll down to see if your item appears

**Solution 2: Check Your Dashboard**
1. Go to Dashboard (if logged in)
2. Click "My Posted Items" tab
3. If your item appears here → **It was created successfully**
4. It will also appear in search shortly

**Solution 3: Clear Browser Cache**
1. Press `Ctrl+Shift+R` on search page
2. This hard-refreshes and loads latest data

**Solution 4: Check Data Directory**
1. Open file explorer
2. Go to `/backend/data/items.json`
3. Open with text editor
4. Search for your item title
5. If it's there → Item was created, just refresh search page

---

## ❌ Issue 6: Image Not Uploading

### **What it means:**
You selected an image but it didn't save with the item.

### **Solutions:**

**Check 1: Is image within size limit?**
- Max: 2MB
- If larger, compress the image

**Check 2: Is format supported?**
- ✅ JPG
- ✅ PNG
- ✅ GIF
- ❌ Others might not work
- Try JPG format

**Check 3: Did you actually select a file?**
1. Click "Choose File" button
2. Select an image
3. Filename should appear below button
4. Confirm before posting

**Manual Test:**
1. Go to browser console: `F12`
2. Try uploading - check for error messages
3. Screenshot any errors

---

## ✅ How to Verify Everything is Working

### **Test 1: Backend Running**
Go to: `http://localhost:5000/api`

Should see:
```json
{"message":"Campus Lost & Found API is running (JSON Storage)"}
```

### **Test 2: Sample Data Loaded**
Go to: `http://localhost:5000/api/items`

Should see: A JSON array with 8 items

### **Test 3: Login Working**
1. Go to: `http://localhost:5000/login.html`
2. Enter: `madhuravani@campus.edu` / `password123`
3. Click Login
4. ✅ Should redirect to home page

### **Test 4: Items Loading**
1. Go to: `http://localhost:5000/search.html`
2. Wait a few seconds
3. ✅ Should see 8 items in a list

### **Test 5: Post Item Working**
1. Login first
2. Go to: `http://localhost:5000/post-lost.html`
3. Fill all fields
4. Click "Post Lost Item"
5. ✅ Should say "Item posted successfully"

---

## 🐛 Debug Information to Gather

If something still doesn't work, gather this info:

1. **Screenshot of the error message**
2. **Open DevTools: `F12` > Console tab**
3. **Screenshot any red error messages**
4. **Check token:** 
   - Type in console: `localStorage.getItem('token')`
   - Screenshot the result
5. **Check user:**
   - Type in console: `localStorage.getItem('user')`
   - Screenshot the result
6. **Check network:**
   - Go to Network tab
   - Perform the failing action
   - Screenshot the failed request

---

## 📞 Quick Reference

| Issue | Command to Check |
|-------|------------------|
| Token issue | `localStorage.getItem('token')` |
| User issue | `localStorage.getItem('user')` |
| Clear storage | `localStorage.clear()` |
| Check API | Open `http://localhost:5000/api` |
| Check items | Open `http://localhost:5000/api/items` |

---

## ✅ Still Having Issues?

Make sure:
1. ✅ Backend is running: `npm start` in `/backend` folder
2. ✅ You're using correct URLs (starts with `http://localhost:5000`)
3. ✅ Browser console shows no errors (`F12`)
4. ✅ You've cleared cache with `Ctrl+Shift+R`
5. ✅ You're logged in with valid credentials

If still stuck, gather the debug info above and describe what you're trying to do!
