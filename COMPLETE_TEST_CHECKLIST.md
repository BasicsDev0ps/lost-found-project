# 🎯 COMPLETE TEST CHECKLIST - Campus Lost & Found Portal

## ✅ PRE-TEST VERIFICATION

**Backend Status?**
```
curl http://localhost:5000/api
```
✅ Should see: `{"message":"Campus Lost & Found API is running..."}`

**Test Data Loaded?**
```
curl http://localhost:5000/api/items
```
✅ Should see a list of 8 items in JSON format

---

## 🧪 TEST 1: Home Page
**URL:** `http://localhost:5000/index.html`

- [ ] Page loads without errors
- [ ] Can see "Welcome to Campus Lost & Found"
- [ ] Can see recent found items section
- [ ] Landing page looks professional

---

## 🧪 TEST 2: Navigation
**From Home Page:**

- [ ] Click "Search Lost Items" → Goes to search page
- [ ] Click "Report Found Item" → Goes to post-found page
- [ ] Click "Login" → Goes to login page
- [ ] Click "Home" logo → Returns to home

---

## 🧪 TEST 3: User Registration
**URL:** `http://localhost:5000/register.html`

Fill in:
- [ ] Name: `Test User`
- [ ] Email: `testuser@campus.edu`
- [ ] Password: `testpass123`
- [ ] Phone: `+91-9999999999`

Then:
- [ ] Click "Register"
- [ ] Should see "Registration successful!" alert
- [ ] Should redirect to home page
- [ ] Navbar should show "user" dropdown (logged in)

---

## 🧪 TEST 4: User Login
**URL:** `http://localhost:5000/login.html`

**Test Login #1 (Student):**
- [ ] Email: `madhuravani@campus.edu`
- [ ] Password: `password123`
- [ ] Click "Login"
- [ ] ✅ Should see "Login successful!" message
- [ ] ✅ Should redirect to home page
- [ ] ✅ Check console: `localStorage.getItem('token')` should return a long string

**Test Login #2 (Try wrong password):**
- [ ] Email: `madhuravani@campus.edu`
- [ ] Password: `wrongpassword`
- [ ] Click "Login"
- [ ] ✅ Should show error: "Invalid email or password"

---

## 🧪 TEST 5: Search Items
**URL:** `http://localhost:5000/search.html` (must be logged in)

- [ ] Wait for page to load
- [ ] ✅ Should see 8 items in a list
- [ ] Each item shows: Title, Description, Category, Type badge
- [ ] Each item shows: "Lost" (red) or "Found" (green) badge

**Test Filter by Type (Lost):**
- [ ] Click dropdown showing filter options
- [ ] Select "lost"
- [ ] ✅ Should show only lost items (should be 4)
- [ ] Reset filter

**Test Filter by Type (Found):**
- [ ] Select "found"
- [ ] ✅ Should show only found items (should be 4)

**Test Filter by Category:**
- [ ] Try different categories (Accessories, Books, Electronics, etc.)
- [ ] ✅ Should filter correctly

**Test Search Box:**
- [ ] Type in search: `watch`
- [ ] ✅ Should show only items with "watch" in title/description
- [ ] Clear search
- [ ] ✅ Should show all items again

---

## 🧪 TEST 6: View Item Details
**From Search Page:**

- [ ] Click on any item card
- [ ] ✅ Should show full item details page
- [ ] Should see: Title, Description, Category, Location, Status
- [ ] If item is "available" and not your item: ✅ "Claim" button visible
- [ ] If item is yours: ✅ "Resolve" button visible
- [ ] Go back button works

---

## 🧪 TEST 7: Post Lost Item
**URL:** `http://localhost:5000/post-lost.html` (must be logged in)

Fill in:
- [ ] Title: `My Lost Silver Watch`
- [ ] Description: `Lost near library, silver color, round face`
- [ ] Category: `Accessories`
- [ ] Location: `Library`
- [ ] Date: (auto-filled or select date)
- [ ] (Optional) Upload image: Choose a JPG/PNG file

Click "Post Lost Item":
- [ ] ✅ Should show "Item posted successfully!" message
- [ ] ✅ Should redirect to search page after 2 seconds
- [ ] ✅ New item should appear in search results

---

## 🧪 TEST 8: Post Found Item
**URL:** `http://localhost:5000/post-found.html` (must be logged in)

Fill in:
- [ ] Title: `Found Blue Backpack`
- [ ] Description: `Found in cafeteria, blue color, has pockets`
- [ ] Category: `Accessories`
- [ ] Location: `Cafeteria`
- [ ] (Optional) Upload image

Click "Post Found Item":
- [ ] ✅ Should succeed
- [ ] ✅ New item should appear in search as "Found"
- [ ] ✅ Status should be "available"

---

## 🧪 TEST 9: Claim Item
**From Search Page:**

- [ ] Find a "Found" item with status "available"
- [ ] Click on it to see details
- [ ] Click "Claim This Item" button
- [ ] ✅ Should show "Item claimed successfully"
- [ ] ✅ Go to search page
- [ ] ✅ Item status should change to "claimed"

---

## 🧪 TEST 10: Dashboard
**URL:** `http://localhost:5000/dashboard.html` (must be logged in)

**Check Tabs:**
- [ ] Tab 1: "My Posted Items" - Should show items YOU posted
- [ ] Tab 2: "Items I've Claimed" - Should show items you claimed
- [ ] Tab 3: "Profile Settings" - Should show your details

**My Posted Items:**
- [ ] Should see at least 1 item (the one we posted earlier)
- [ ] Should see "Resolve" button for each item
- [ ] Can click resolve to mark as returned

**Items I've Claimed:**
- [ ] Should see item we claimed earlier
- [ ] Status should show "claimed"

---

## 🧪 TEST 11: Image Upload
**URL:** `http://localhost:5000/post-lost.html`

- [ ] Click "Choose File" button
- [ ] Select a JPG or PNG image (under 2MB)
- [ ] Filename should appear below button
- [ ] Post the item
- [ ] ✅ Item should be created successfully with image

---

## 🧪 TEST 12: Logout
**From any page:**

- [ ] Click "user" dropdown in navbar
- [ ] Click "Logout"
- [ ] ✅ Should clean localStorage
- [ ] ✅ Navbar should now show "Login/Register" instead of "user"
- [ ] Try going to post-lost page
- [ ] ✅ Should redirect to login page

---

## 🧪 TEST 13: Responsive Design (Mobile)
**In any browser:**

Press `F12` to open DevTools, then:
1. Click "Device Toolbar" button (toggle device mode)
2. Select "iPhone X" preset

- [ ] All pages should look good on mobile (375px width)
- [ ] Text should be readable
- [ ] Buttons should be clickable
- [ ] No horizontal scrolling

**Tablet View:**
1. Select "iPad" preset

- [ ] All pages should look good at 768px width
- [ ] Layout should adapt nicely

---

## 🧪 TEST 14: Error Handling

**Test Missing Fields:**
1. Go to post-lost page
2. Leave "Title" empty
3. Click "Post Lost Item"
4. ✅ Should show error: "All fields are required"

**Test Wrong Login:**
1. Go to login
2. Try: `nonexistent@campus.edu` / `password`
3. Click Login
4. ✅ Should show: "Invalid email or password"

**Test Posting Without Login:**
1. Logout (if logged in)
2. Go to post-lost.html
3. Try entering form data
4. Click Post
5. ✅ Should show "Please login first"

---

## ✅ Final Verification Checklist

- [ ] Backend running: `npm start` (in `/backend` folder)
- [ ] All 8 sample items visible in search
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can post lost/found items
- [ ] Can claim items
- [ ] Can view dashboard
- [ ] Responsive on mobile view
- [ ] No errors in browser console (F12 > Console)
- [ ] Navbar shows/hides based on login state

---

## 📊 Summary of Tests

| Test | Result |
|------|--------|
| Test 1 (Home) | ✅ |
| Test 2 (Nav) | ✅ |
| Test 3 (Register) | ✅ |
| Test 4 (Login) | ✅ |
| Test 5 (Search) | ✅ |
| Test 6 (Details) | ✅ |
| Test 7 (Post Lost) | ✅ |
| Test 8 (Post Found) | ✅ |
| Test 9 (Claim) | ✅ |
| Test 10 (Dashboard) | ✅ |
| Test 11 (Images) | ✅ |
| Test 12 (Logout) | ✅ |
| Test 13 (Mobile) | ✅ |
| Test 14 (Errors) | ✅ |

**All Tests Passing? Congratulations! 🎉**

---

## 🆘 If Any Test Fails

1. **Screenshot the failure**
2. **Open DevTools:** `F12`
3. **Check Console tab** for red errors
4. **Read the error message** carefully
5. **Check Troubleshooting.md** for solutions
6. **Try hard refresh:** `Ctrl+Shift+R`
7. **Clear storage:** Console > `localStorage.clear()`

---

**Ready? Start testing!**

Go to: `http://localhost:5000/index.html` 🚀
