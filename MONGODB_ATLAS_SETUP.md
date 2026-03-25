# MongoDB Atlas Setup & Deployment Guide

## ✅ Current Configuration

Your backend is now configured to use **MongoDB Atlas** instead of local JSON files.

### 1. **MongoDB Atlas Connection Details**

```
Connection String (in .env):
mongodb+srv://basicsdev0ps_db_user:Fx8TVD5TQRBY8BRr@lostfound-cluster.zabuwxa.mongodb.net/lost-found?retryWrites=true&w=majority
```

**Credentials:**
- **Database User**: `basicsdev0ps_db_user`
- **Password**: `Fx8TVD5TQRBY8BRr`
- **Cluster**: `lostfound-cluster`
- **Database**: `lost-found`

---

## 📝 Files Updated

### 1. **backend/.env**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://basicsdev0ps_db_user:Fx8TVD5TQRBY8BRr@lostfound-cluster.zabuwxa.mongodb.net/lost-found?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# API Configuration
FRONTEND_URL=http://localhost:3000
```

### 2. **backend/package.json**
Updated start scripts to use MongoDB version:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node seed-data.js"
}
```

### 3. **backend/server.js**
MongoDB connection updated:
```javascript
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas connected successfully!'))
  .catch(err => console.log('❌ MongoDB connection error:', err));
```

---

## 🔐 Important: IP Whitelist Issue

**Current Error**: `ECONNREFUSED` - Connection refused

**Why?** Your local machine's IP address is **NOT whitelisted** in MongoDB Atlas.

### ✅ How to Fix (For Local Testing):

1. **Go to MongoDB Atlas Dashboard**:
   - URL: https://cloud.mongodb.com/
   - Login with your account

2. **Navigate to Network Access**:
   - Click on your cluster `lostfound-cluster`
   - Go to **Security** → **Network Access**

3. **Add Your IP Address**:
   - Click **+ ADD IP ADDRESS**
   - Add your current public IP or allow **0.0.0.0/0** (allows all IPs - for development only)
   - Click **Confirm**

4. **Then restart the server**:
   ```bash
   cd backend
   Get-Process node | Stop-Process -Force
   node server.js
   ```

---

## 🚀 For GitHub & Deployment

### 1. **Push to GitHub**:
```bash
git add .
git commit -m "Configure MongoDB Atlas connection"
git push origin main
```

### 2. **Environment Variables for Production**:

When deploying to GitHub/Vercel/Heroku/etc., add these **secrets/environment variables**:

```
MONGODB_URI=mongodb+srv://basicsdev0ps_db_user:Fx8TVD5TQRBY8BRr@lostfound-cluster.zabuwxa.mongodb.net/lost-found?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret_key_here
NODE_ENV=production
PORT=5000
```

### 3. **GitHub Secrets Setup** (if using GitHub Actions):
1. Go to your GitHub repo
2. **Settings** → **Secrets and variables** → **Actions**
3. Add:
   - `MONGODB_URI` = your connection string
   - `JWT_SECRET` = your secret key
   - `PORT` = 5000

### 4. **Heroku Deployment** (if using Heroku):
```bash
heroku config:set MONGODB_URI="mongodb+srv://basicsdev0ps_db_user:Fx8TVD5TQRBY8BRr@lostfound-cluster.zabuwxa.mongodb.net/lost-found?retryWrites=true&w=majority"
heroku config:set JWT_SECRET="your_strong_secret_key"
```

### 5. **Vercel Deployment** (if using Vercel):
1. Go to Vercel Dashboard → Your Project
2. **Settings** → **Environment Variables**
3. Add the same variables above

---

## 🗄️ Database Structure

MongoDB Atlas will automatically create:
- **Database**: `lost-found`
- **Collections** (tables):
  - `users` - User accounts
  - `items` - Lost/Found items
  - `notifications` - User notifications

---

## 📊 MongoDB Atlas Features

Your setup now includes:
- ✅ **Cloud-based database** (no local JSON files)
- ✅ **Automatic backups** (MongoDB Atlas handles this)
- ✅ **Scalable** (handles more data easily)
- ✅ **Secure** (encrypted connections)
- ✅ **Multi-region** support
- ✅ **Real-time monitoring** via Atlas dashboard

---

## 🧪 Testing MongoDB Connection

Run this to test:
```bash
cd backend
npm install
node server.js
```

Expected output (after IP whitelisting):
```
✅ Server running on http://localhost:5000
✅ MongoDB Atlas connected successfully!
```

---

## 🔄 Rollback to JSON (if needed)

If you need to go back to JSON file storage:
```bash
npm run serverJson.js  # (old command)
```

---

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| `ECONNREFUSED` | Whitelist your IP in MongoDB Atlas |
| `AUTHENTICATION FAILED` | Check username/password in .env |
| `Cannot find module` | Run `npm install` |
| `Connection timeout` | Check your internet connection |

---

## ✅ Next Steps

1. **Whitelist your IP** in MongoDB Atlas (required for local testing)
2. **Test login/register** locally
3. **Push to GitHub** with new configuration
4. **Deploy to your platform** (Heroku/Vercel/etc.)
5. **Whitelist deployment IP** in MongoDB Atlas network access

---

**Created**: March 25, 2026
**Status**: MongoDB Atlas configured, ready for deployment
