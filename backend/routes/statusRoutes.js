const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/db', (req, res) => {
  const isAtlas = mongoose.connection.getClient()?.s?.url?.includes('mongodb.net') || false;
  const dbName = mongoose.connection.name;
  
  res.json({
    connected: mongoose.connection.readyState === 1,
    dbStatus: isAtlas ? 'Atlas' : 'In-Memory',
    dbName: dbName,
    message: isAtlas ? 'Connected to healthy cloud database.' : 'Running on temporary local database. Data will not persist.'
  });
});

module.exports = router;
