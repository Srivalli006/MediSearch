require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/pharmacies', require('./routes/pharmacyRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/status', require('./routes/statusRoutes'));

// Serve Static Files for Deployment
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Catch-all route to serve the frontend's index.html
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
const seedDatabase = require('./seed');

async function startServer() {
  try {
    const uri = process.env.MONGODB_URI;
    let connectedToAtlas = false;
    
    if (uri) {
      try {
        console.log('⏳ Attempting to connect to MongoDB...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Connected to MongoDB successfully');
        connectedToAtlas = true;
      } catch (atlasError) {
        console.error('❌ MongoDB Atlas Connection Error Detail:');
        console.error('Message:', atlasError.message);
        console.error('Code:', atlasError.code);
        if (atlasError.reason) console.error('Reason:', atlasError.reason);
        console.error(`⚠️ Falling back to In-Memory DB.`);
      }
    }

    if (!connectedToAtlas) {
      console.log('⏳ Starting Local MongoMemoryServer Fallback...');
      const mongod = await MongoMemoryServer.create();
      const localUri = mongod.getUri();
      await mongoose.connect(localUri);
      console.log('✅ Connected to Local In-Memory MongoDB');
    }
    
    // Seed database if empty
    const collections = await mongoose.connection.db.collections();
    if (collections.length === 0) {
        console.log("Database is empty. Seeding initial data...");
        await seedDatabase();
    } else {
        console.log("Database already has data. Skipping seed.");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error.message);
  }
}

startServer();
