# 🚀 Getting Started Checklist

Complete this checklist to launch your Campus Lost & Found Portal!

## Prerequisites ✅

- [ ] **Install Node.js** (v14+)
  - Download: https://nodejs.org/
  - Verify: Open terminal and run `node --version`

- [ ] **Install MongoDB**
  - Option A: Local MongoDB - https://docs.mongodb.com/manual/installation/
  - Option B: MongoDB Atlas (Cloud) - https://www.mongodb.com/cloud/atlas (Recommended)
  - Verify: Connection string ready

- [ ] **Code Editor** (VS Code recommended)
  - Download: https://code.visualstudio.com/

## Project Setup ✅

### Backend Configuration

- [ ] **Navigate to backend folder**
  ```bash
  cd backend
  ```

- [ ] **Install dependencies**
  ```bash
  npm install
  ```
  ⏳ This will take 1-2 minutes...

- [ ] **Create .env file**
  - Copy `backend/.env.example` to `backend/.env`
  - Edit the file and add your MongoDB connection string:
    ```
    MONGODB_URI=mongodb://localhost:27017/lost-found
    ```
    *For MongoDB Atlas, use the connection string provided in your cluster*

- [ ] **Test backend**
  ```bash
  npm start
  ```
  ✓ You should see: "Server is running on http://localhost:5000"
  ✓ And: "MongoDB connected successfully"

### Frontend Configuration

- [ ] **Verify frontend files exist**
  - Check `frontend/index.html` exists
  - Check `frontend/css/styles.css` exists
  - Check `frontend/js/` folder has all JS files

- [ ] **Start frontend server**
  ```bash
  # In frontend folder:
  python -m http.server 8000
  ```
  ✓ Or use Live Server in VS Code

- [ ] **Open in browser**
  - Go to: http://localhost:8000
  - ✓ You should see the home page with "Campus Lost & Found Portal"

## Testing the Application ✅

- [ ] **Test User Registration**
  1. Click "Register" button
  2. Fill in: Name, Email, Phone, Password
  3. Submit the form
  4. ✓ Should be logged in automatically

- [ ] **Test Posting an Item**
  1. Click "Post Lost Item" or "Post Found Item"
  2. Fill in all required fields
  3. Submit
  4. ✓ Should see success message

- [ ] **Test Searching**
  1. Go to "Search Items"
  2. Use filters (type, category, status, location)
  3. ✓ Should see items from your posts

- [ ] **Test Item Details**
  1. Click on any item from search results
  2. ✓ Should see full details and contact info

- [ ] **Test Claiming an Item**
  1. (Login as different user if needed)
  2. Find a "Found Item"
  3. Click "Claim This Item"
  4. ✓ Status should change to "Claimed"

- [ ] **Test Dashboard**
  1. Click on user menu (your name)
  2. Click "Dashboard"
  3. ✓ Should see your posted items and profile settings

## Database Population ✅

- [ ] **Import Sample Data** (Optional but helpful)
  1. Check `backend/SAMPLE_DATA.md`
  2. Follow instructions to import sample items
  3. ✓ Your database will have test data

- [ ] **Or Manually Add Items**
  1. Use the frontend to create test items
  2. ✓ Create 3-4 lost and found items for testing

## Troubleshooting ✅

- [ ] **Backend won't start?**
  - [ ] Check MongoDB is running/accessible
  - [ ] Verify MongoDB URI in `.env` file
  - [ ] Run: `npm install` again

- [ ] **Frontend shows blank page?**
  - [ ] Make sure you're using http://localhost:8000 (not file://)
  - [ ] Use Python server: `python -m http.server 8000`
  - [ ] Check browser console (F12) for errors

- [ ] **Can't see items after posting?**
  - [ ] Hard refresh browser: `Ctrl + Shift + R`
  - [ ] Check backend is running
  - [ ] Check browser console for API errors

- [ ] **Login not working?**
  - [ ] Make sure backend is running
  - [ ] Check email and password are correct
  - [ ] Check browser console for error messages

## Optional Customizations ✅

- [ ] **Change Colors**
  - Edit `frontend/css/styles.css`
  - Search for `#667eea` and `#764ba2` (main colors)
  - Replace with your brand colors

- [ ] **Add Your College Name**
  - Search for "Campus Lost & Found" in HTML files
  - Replace with your college name

- [ ] **Update Contact Info**
  - Edit `frontend/index.html`
  - Update footer contact details

- [ ] **Add Logo/Images**
  - Add images to `frontend/assets/images/`
  - Link them in `index.html`

## Deployment (Future) ✅

- [ ] **Deploy Backend**
  - Options: Heroku, AWS, Railway, Render
  - Update `API_URL` in frontend to point to deployed backend

- [ ] **Deploy Frontend**
  - Options: Vercel, Netlify, GitHub Pages
  - Ensure CORS is enabled on backend

## Final Checks ✅

- [ ] **All pages load correctly**
  - [ ] Home page
  - [ ] Login/Register
  - [ ] Search
  - [ ] Post item forms
  - [ ] Dashboard

- [ ] **All forms work**
  - [ ] Register form
  - [ ] Login form
  - [ ] Post item forms (both)
  - [ ] Profile update form

- [ ] **All buttons work**
  - [ ] Navigation links
  - [ ] Search button
  - [ ] Claim button
  - [ ] Delete button

- [ ] **API calls work**
  - [ ] Can register user
  - [ ] Can login
  - [ ] Can post items
  - [ ] Can search items
  - [ ] Can claim items

- [ ] **Database working**
  - [ ] Data is being saved to MongoDB
  - [ ] Data persists after page refresh
  - [ ] Multiple users can have accounts

## Success! 🎉

If you've completed all checkboxes above, your **Campus Lost & Found Portal** is fully functional!

### Next Steps:
1. Add more sample data to test thoroughly
2. Customize styling to match your college branding
3. Share the application with your college community
4. Gather feedback and add new features
5. Deploy to production for live use

---

## Quick Command Reference

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend (different terminal)
cd frontend
python -m http.server 8000

# Then open browser
http://localhost:8000
```

## Important Notes

⚠️ **Security**: Change `JWT_SECRET` in `.env` before production
⚠️ **Password**: First user registration creates a user account
⚠️ **Images**: Use external URLs for item images (or add upload feature)
⚠️ **CORS**: Currently allows all origins in development

---

**Enjoy your Campus Lost & Found Portal! 🎓**

For detailed documentation, see:
- `README.md` - Full documentation
- `WINDOWS_SETUP.md` - Windows-specific setup
- `PROJECT_SUMMARY.md` - Project overview
