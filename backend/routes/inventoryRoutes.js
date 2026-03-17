const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Medicine = require('../models/Medicine');
const Pharmacy = require('../models/Pharmacy');
const { protect, pharmacyOwnerOnly } = require('../middleware/auth');
const mongoose = require('mongoose');

// @route POST /api/inventory/add  - Add or update medicine in inventory
router.post('/add', protect, pharmacyOwnerOnly, async (req, res) => {
  try {
    const { pharmacyId, medicineId, stockQuantity, price, expiryDate } = req.body;
    console.log('📥 INVENTORY POST ATTEMPT:', { pharmacyId, medicineId, stockQuantity, price, expiryDate });
    console.log('🔌 DB STATUS:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected', 'DB:', mongoose.connection.name);

    if (!pharmacyId || !medicineId || stockQuantity == null || !price || !expiryDate) {
      console.warn('❌ Missing fields in inventory POST');
      return res.status(400).json({ message: 'All inventory fields are required' });
    }

    // Check if pharmacy is verified
    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (!pharmacy) {
      return res.status(404).json({ message: 'Pharmacy not found' });
    }

    if (!pharmacy.isVerified) {
      return res.status(403).json({ 
        message: "Your pharmacy request is still pending admin approval. You cannot add medicines yet. Please wait for the admin's response." 
      });
    }

    let inventoryItem = await Inventory.findOne({ pharmacyId, medicineId });

    if (inventoryItem) {
      console.log('🔍 Found existing inventory item:', inventoryItem._id);
      inventoryItem.stockQuantity = Number(stockQuantity); // CHANGED: Overwrite instead of increment
      inventoryItem.price = price;
      inventoryItem.expiryDate = expiryDate;
      inventoryItem.lastUpdated = Date.now();
      await inventoryItem.save();
      console.log('✅ UPDATED EXISTING ITEM:', inventoryItem._id);
    } else {
      inventoryItem = await Inventory.create({
        pharmacyId,
        medicineId,
        stockQuantity: Number(stockQuantity),
        price,
        expiryDate
      });
      console.log('✅ CREATED NEW ITEM:', inventoryItem._id);
    }

    const populated = await Inventory.findById(inventoryItem._id).populate('medicineId').populate('pharmacyId');
    res.status(200).json({ message: 'Inventory updated successfully', inventory: populated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/inventory/pharmacy/:pharmacyId - Get all inventory for a pharmacy
router.get('/pharmacy/:pharmacyId', async (req, res) => {
  try {
    const inventory = await Inventory.find({ pharmacyId: req.params.pharmacyId })
      .populate('medicineId', 'name description manufacturer')
      .populate('pharmacyId', 'name address');
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route PUT /api/inventory/:id - Update inventory item
router.put('/:id', protect, pharmacyOwnerOnly, async (req, res) => {
  try {
    const { stockQuantity, price, expiryDate } = req.body;
    const item = await Inventory.findById(req.params.id).populate('pharmacyId');
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });

    // Check if pharmacy is verified
    if (!item.pharmacyId.isVerified) {
      return res.status(403).json({ 
        message: "Your pharmacy is not yet approved. You cannot update inventory until admin approval." 
      });
    }

    if (stockQuantity != null) item.stockQuantity = Number(stockQuantity);
    if (price != null) item.price = price;
    if (expiryDate) item.expiryDate = expiryDate;
    item.lastUpdated = Date.now();

    await item.save();
    const populated = await Inventory.findById(item._id).populate('medicineId').populate('pharmacyId');
    res.status(200).json({ message: 'Inventory item updated', inventory: populated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route DELETE /api/inventory/:id - Remove inventory item
router.delete('/:id', protect, pharmacyOwnerOnly, async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).populate('pharmacyId');
    if (!item) return res.status(404).json({ message: 'Inventory item not found' });

    // Check if pharmacy is verified
    if (!item.pharmacyId.isVerified) {
      return res.status(403).json({ 
        message: "Your pharmacy is not yet approved. You cannot delete inventory items until admin approval." 
      });
    }

    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Inventory item removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
