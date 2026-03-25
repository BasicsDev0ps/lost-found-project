# Sample Data for Campus Lost & Found Portal

This file contains sample data that you can import into MongoDB.

## Sample Users
```json
[
  {
    "_id": {"$oid": "507f1f77bcf86cd799439011"},
    "name": "Madhuravani",
    "email": "madhuravani@campus.edu",
    "password": "$2a$10$YourHashedPasswordHere",
    "phone": "+91-9876543210",
    "role": "student",
    "profilePicture": null,
    "isVerified": true,
    "createdAt": {"$date": "2024-01-15T10:00:00Z"},
    "updatedAt": {"$date": "2024-01-15T10:00:00Z"}
  },
  {
    "_id": {"$oid": "507f1f77bcf86cd799439012"},
    "name": "Admin User",
    "email": "admin@campus.edu",
    "password": "$2a$10$YourHashedPasswordHere",
    "phone": "+91-9876543211",
    "role": "admin",
    "profilePicture": null,
    "isVerified": true,
    "createdAt": {"$date": "2024-01-15T10:00:00Z"},
    "updatedAt": {"$date": "2024-01-15T10:00:00Z"}
  }
]
```

## Sample Lost Items
```json
[
  {
    "_id": {"$oid": "507f1f77bcf86cd799439021"},
    "title": "Red Backpack",
    "description": "Red backpack with laptop compartment and water bottle holder. Contains important books and notebooks.",
    "category": "accessories",
    "type": "lost",
    "location": "Library, Block A",
    "foundDate": {"$date": "2024-01-20T14:30:00Z"},
    "image": "https://via.placeholder.com/400x300?text=Red+Backpack",
    "status": "available",
    "postedBy": {"$oid": "507f1f77bcf86cd799439011"},
    "claimedBy": null,
    "claimDate": null,
    "isVerified": true,
    "verifiedBy": {"$oid": "507f1f77bcf86cd799439012"},
    "createdAt": {"$date": "2024-01-20T15:00:00Z"},
    "updatedAt": {"$date": "2024-01-20T15:00:00Z"}
  },
  {
    "_id": {"$oid": "507f1f77bcf86cd799439022"},
    "title": "Student ID Card (23BCA001)",
    "description": "Blue student ID card with photo. Name: Raj Kumar",
    "category": "idCard",
    "type": "lost",
    "location": "Canteen Area",
    "foundDate": {"$date": "2024-01-18T12:00:00Z"},
    "image": "https://via.placeholder.com/400x300?text=ID+Card",
    "status": "claimed",
    "postedBy": {"$oid": "507f1f77bcf86cd799439011"},
    "claimedBy": {"$oid": "507f1f77bcf86cd799439012"},
    "claimDate": {"$date": "2024-01-19T10:00:00Z"},
    "isVerified": true,
    "verifiedBy": {"$oid": "507f1f77bcf86cd799439012"},
    "createdAt": {"$date": "2024-01-18T13:00:00Z"},
    "updatedAt": {"$date": "2024-01-19T10:00:00Z"}
  }
]
```

## Sample Found Items
```json
[
  {
    "_id": {"$oid": "507f1f77bcf86cd799439031"},
    "title": "Scientific Calculator",
    "description": "Black Casio calculator with battery. Found in classroom 301.",
    "category": "calculator",
    "type": "found",
    "location": "Classroom Block, Room 301",
    "foundDate": {"$date": "2024-01-19T11:30:00Z"},
    "image": "https://via.placeholder.com/400x300?text=Calculator",
    "status": "available",
    "postedBy": {"$oid": "507f1f77bcf86cd799439012"},
    "claimedBy": null,
    "claimDate": null,
    "isVerified": true,
    "verifiedBy": {"$oid": "507f1f77bcf86cd799439012"},
    "createdAt": {"$date": "2024-01-19T12:00:00Z"},
    "updatedAt": {"$date": "2024-01-19T12:00:00Z"}
  },
  {
    "_id": {"$oid": "507f1f77bcf86cd799439032"},
    "title": "Water Bottle (Tupperware)",
    "description": "Blue water bottle with name 'Priya' written on it. Found near parking lot.",
    "category": "waterBottle",
    "type": "found",
    "location": "Parking Lot",
    "foundDate": {"$date": "2024-01-21T16:00:00Z"},
    "image": "https://via.placeholder.com/400x300?text=Water+Bottle",
    "status": "available",
    "postedBy": {"$oid": "507f1f77bcf86cd799439012"},
    "claimedBy": null,
    "claimDate": null,
    "isVerified": true,
    "verifiedBy": {"$oid": "507f1f77bcf86cd799439012"},
    "createdAt": {"$date": "2024-01-21T16:30:00Z"},
    "updatedAt": {"$date": "2024-01-21T16:30:00Z"}
  }
]
```

## How to Import Sample Data

1. **Using MongoDB Shell:**
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Switch to database
   use lost-found
   
   # Insert users
   db.users.insertMany([...user data...])
   
   # Insert items
   db.items.insertMany([...item data...])
   ```

2. **Using MongoDB Compass:**
   - Open MongoDB Compass
   - Connect to your database
   - Right-click on the collection
   - Click "Insert Document"
   - Paste the JSON data

## Important Notes

- Replace password hashes with actual bcrypt hashes
- Update dates to current dates if needed
- Your MongoDB connection string should be set in `.env` file: `MONGODB_URI=mongodb://localhost:27017/lost-found`
- Create user accounts through the registration page instead of manual insertion for proper password hashing
