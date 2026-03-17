const mongoose = require('mongoose');
const Inventory = require('./models/Inventory');
const Pharmacy = require('./models/Pharmacy');
const Medicine = require('./models/Medicine');
require('dotenv').config();

async function checkDangling() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const inventory = await Inventory.find().populate('pharmacyId').populate('medicineId');
        console.log(`Total inventory items: ${inventory.length}`);

        const danglingPharmacies = inventory.filter(item => !item.pharmacyId);
        const danglingMedicines = inventory.filter(item => !item.medicineId);

        if (danglingPharmacies.length > 0) {
            console.log(`Found ${danglingPharmacies.length} inventory items with missing pharmacies!`);
            danglingPharmacies.forEach(item => {
                console.log(`Item ID: ${item._id}, Medicine ID: ${item.medicineId?._id || 'missing'}`);
            });
        } else {
            console.log('No dangling pharmacies found.');
        }

        if (danglingMedicines.length > 0) {
            console.log(`Found ${danglingMedicines.length} inventory items with missing medicines!`);
        } else {
            console.log('No dangling medicines found.');
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkDangling();
