const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pharmacy = require('../models/Pharmacy');
const Medicine = require('../models/Medicine');
const Inventory = require('../models/Inventory');
const SearchLog = require('../models/SearchLog');
const { protect, adminOnly } = require('../middleware/auth');

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// @route GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalPharmacies, verifiedPharmacies, totalMedicines, inStockItems] = await Promise.all([
      User.countDocuments(),
      Pharmacy.countDocuments(),
      Pharmacy.countDocuments({ isVerified: true }),
      Medicine.countDocuments(),
      Inventory.countDocuments({ stockQuantity: { $gt: 0 } })
    ]);
    res.json({
      totalUsers,
      totalPharmacies,
      verifiedPharmacies,
      pendingPharmacies: totalPharmacies - verifiedPharmacies,
      totalMedicines,
      inStockItems
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route GET /api/admin/department-stats
router.get('/department-stats', async (req, res) => {
  try {
    // Aggregate search logs by department
    const searchStats = await SearchLog.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Also count medicines per department from DB
    const medicineStats = await Medicine.aggregate([
      { $group: { _id: '$department', medicines: { $sum: 1 } } },
      { $sort: { medicines: -1 } }
    ]);

    res.json({ searchStats, medicineStats });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route GET /api/admin/pharmacies
router.get('/pharmacies', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find().populate('ownerId', 'name email').sort({ createdAt: -1 });
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route PUT /api/admin/pharmacies/:id/verify
router.put('/pharmacies/:id/verify', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
    if (!pharmacy) return res.status(404).json({ message: 'Pharmacy not found' });
    res.json({ message: 'Pharmacy verified', pharmacy });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route DELETE /api/admin/pharmacies/:id
router.delete('/pharmacies/:id', async (req, res) => {
  try {
    await Pharmacy.findByIdAndDelete(req.params.id);
    await Inventory.deleteMany({ pharmacyId: req.params.id });
    res.json({ message: 'Pharmacy removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route GET /api/admin/medicines
router.get('/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ name: 1 });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route DELETE /api/admin/medicines/:id
router.delete('/medicines/:id', async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    await Inventory.deleteMany({ medicineId: req.params.id });
    res.json({ message: 'Medicine removed from catalog' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route GET /api/admin/search-logs — Recent search activity
router.get('/search-logs', async (req, res) => {
  try {
    const logs = await SearchLog.find().sort({ timestamp: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
