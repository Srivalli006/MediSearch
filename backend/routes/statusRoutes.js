const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/db', (req, res) => {
  const conn = mongoose.connection;
  const clientUrl = conn.getClient()?.s?.url || '';
  const isAtlas = clientUrl.includes('mongodb.net') || clientUrl.includes('mongodb+srv');
  const dbName = conn.name;
  
  res.json({
    connected: conn.readyState === 1,
    dbStatus: isAtlas ? 'Atlas' : (conn.host === '127.0.0.1' || conn.host === 'localhost' ? 'Local' : 'In-Memory'),
    dbName: dbName,
    isAtlas: isAtlas,
    message: isAtlas ? 'Connected to healthy cloud database.' : 'Running on temporary or local database.'
  });
});

module.exports = router;
