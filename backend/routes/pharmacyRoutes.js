const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy');
const { protect, pharmacyOwnerOnly } = require('../middleware/auth');

// @route POST /api/pharmacies/register
router.post('/register', protect, pharmacyOwnerOnly, async (req, res) => {
  try {
    const { name, address, lat, lng, contactNumber } = req.body;

    if (!name || !address || !lat || !lng || !contactNumber) {
      return res.status(400).json({ message: 'Please fill in all pharmacy fields' });
    }

    const newPharmacy = new Pharmacy({
      name,
      ownerId: req.user._id,
      address,
      location: { lat: Number(lat), lng: Number(lng) },
      contactNumber
    });

    await newPharmacy.save();
    res.status(201).json({ message: 'Pharmacy registered successfully', pharmacy: newPharmacy });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/pharmacies
router.get('/', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find().populate('ownerId', 'name email');
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/pharmacies/my
router.get('/my', protect, pharmacyOwnerOnly, async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({ ownerId: req.user._id });
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/pharmacies/owner/:ownerId
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({ ownerId: req.params.ownerId });
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/pharmacies/:id
router.get('/:id', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id).populate('ownerId', 'name email');
    if (!pharmacy) return res.status(404).json({ message: 'Pharmacy not found' });
    res.status(200).json(pharmacy);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
