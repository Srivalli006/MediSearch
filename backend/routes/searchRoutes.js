const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Medicine = require('../models/Medicine');
const SearchLog = require('../models/SearchLog');

// --- Haversine formula to compute distance in km ---
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// @route GET /api/search — Search by name, composition, or department
router.get('/', async (req, res) => {
  try {
    const { query, composition, department, lat, lng } = req.query;

    if (!query && !composition && !department) {
      return res.status(400).json({ message: 'Provide at least one of: query, composition, or department' });
    }

    // Build medicine filter
    const filter = {};

    if (query) {
      const q = query.trim();
      
      // Find initial matches by name or composition (partial match)
      const initialMatches = await Medicine.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { composition: { $regex: q, $options: 'i' } }
        ]
      });

      // Extract all compositions from those matches
      const allCompositions = new Set();
      initialMatches.forEach(m => {
        (m.composition || []).forEach(c => allCompositions.add(c));
      });

      // Build the final query: either matches name/composition loosely, OR shares an exact composition 
      const compArray = Array.from(allCompositions);
      const orConditions = [
        { name: { $regex: q, $options: 'i' } },
        { composition: { $regex: q, $options: 'i' } }
      ];
      
      if (compArray.length > 0) {
        orConditions.push({ composition: { $in: compArray } });
      }

      filter.$or = orConditions;
    }

    if (composition) {
      // Search inside the composition array
      filter.composition = { $elemMatch: { $regex: composition.trim(), $options: 'i' } };
    }

    if (department) {
      filter.department = department;
    }

    const medicines = await Medicine.find(filter);

    if (medicines.length === 0) {
      // Still log the search
      SearchLog.create({ query: query || composition || department, department: department || 'General', resultCount: 0 }).catch(() => {});
      return res.status(200).json([]);
    }

    const medicineIds = medicines.map(m => m._id);

    // Fetch in-stock inventory with pharmacy info
    const availableInventory = await Inventory.find({
      medicineId: { $in: medicineIds },
      stockQuantity: { $gt: 0 }
    })
      .populate('pharmacyId', 'name address contactNumber location isVerified')
      .populate('medicineId', 'name description manufacturer composition department usageInstructions sideEffects detailedComposition clinicalOverview');

    // Format + calculate distance
    const userLat = lat ? parseFloat(lat) : null;
    const userLng = lng ? parseFloat(lng) : null;

    let results = availableInventory
      .filter(item => item.pharmacyId && item.medicineId)
      .map(item => {
        const pharmLat = item.pharmacyId.location?.lat;
        const pharmLng = item.pharmacyId.location?.lng;

        let distanceKm = null;
        if (userLat !== null && userLng !== null && pharmLat && pharmLng) {
          distanceKm = haversineDistance(userLat, userLng, pharmLat, pharmLng);
        }

        // Calculate relevance score
        const lowerQuery = (query || '').toLowerCase().trim();
        const medName = item.medicineId.name.toLowerCase();
        
        let relevanceScore = 0;
        if (medName === lowerQuery) relevanceScore = 1000; // Super high for exact name match
        else if (medName.startsWith(lowerQuery)) relevanceScore = 500;
        else if (medName.includes(lowerQuery)) relevanceScore = 100;
        else if (item.medicineId.composition.some(c => c.toLowerCase().includes(lowerQuery))) relevanceScore = 50;

        return {
          inventoryId:      item._id,
          medicineId:       item.medicineId._id,
          medicine:         item.medicineId.name,
          description:      item.medicineId.description,
          manufacturer:     item.medicineId.manufacturer,
          composition:      item.medicineId.composition,
          detailedComposition: item.medicineId.detailedComposition,
          clinicalOverview: item.medicineId.clinicalOverview,
          department:       item.medicineId.department,
          usageInstructions: item.medicineId.usageInstructions,
          sideEffects:      item.medicineId.sideEffects,
          pharmacy:         item.pharmacyId.name,
          pharmacyId:       item.pharmacyId._id,
          address:          item.pharmacyId.address,
          contact:          item.pharmacyId.contactNumber,
          location:         item.pharmacyId.location,
          isVerified:       item.pharmacyId.isVerified,
          stock:            item.stockQuantity,
          price:            item.price,
          expiryDate:       item.expiryDate,
          relevanceScore,
          distanceKm:       distanceKm !== null ? parseFloat(distanceKm.toFixed(2)) : null,
          distance:         distanceKm !== null ? `${distanceKm.toFixed(1)} km` : 'N/A'
        };
      });

    // Sort by relevance first, then distance
    results.sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999);
    });

    // Log the search for department analytics
    const deptUsed = department || (medicines[0]?.department) || 'General';
    SearchLog.create({ query: query || composition || department, department: deptUsed, resultCount: results.length }).catch(() => {});

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/search/catalog — Get all medicines in catalog
router.get('/catalog', async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ name: 1 });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/search/medicine/:id — Get single medicine detail
router.get('/medicine/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });

    // Also get all pharmacies that have this medicine
    const inventory = await Inventory.find({
      medicineId: req.params.id,
      stockQuantity: { $gt: 0 }
    }).populate('pharmacyId', 'name address contactNumber location isVerified');

    // Filter out inventory entries where pharmacyId is null (e.g. pharmacy was deleted)
    const filteredInventory = inventory.filter(item => item.pharmacyId);

    res.status(200).json({ medicine, availability: filteredInventory });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route POST /api/search/catalog — Add medicine to catalog
router.post('/catalog', async (req, res) => {
  try {
    const { name, description, manufacturer, composition, department, usageInstructions, sideEffects } = req.body;
    if (!name) return res.status(400).json({ message: 'Medicine name is required' });

    const exists = await Medicine.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
    if (exists) return res.status(400).json({ message: 'Medicine already exists in catalog' });

    const newMed = await Medicine.create({
      name, description, manufacturer,
      composition: Array.isArray(composition) ? composition : (composition ? [composition] : []),
      detailedComposition: req.body.detailedComposition || [],
      clinicalOverview: req.body.clinicalOverview || {},
      department: department || 'General',
      usageInstructions: usageInstructions || '',
      sideEffects: sideEffects || ''
    });

    res.status(201).json({ message: 'Medicine added to catalog', medicine: newMed });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route GET /api/search/departments — List valid departments
router.get('/departments', (req, res) => {
  const Medicine = require('../models/Medicine');
  res.json(Medicine.DEPARTMENTS || [
    'General', 'Cardiology', 'Paediatrics', 'Dermatology',
    'Orthopaedics', 'Neurology', 'Oncology', 'Gynaecology',
    'Ophthalmology', 'ENT', 'Psychiatry', 'Pulmonology'
  ]);
});

module.exports = router;
