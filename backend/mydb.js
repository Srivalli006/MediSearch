const mongoose = require("mongoose");
const dns = require('dns');

// Force use Google DNS (8.8.8.8) to resolve Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MONGO_URI = "mongodb+srv://clusteruser:cluster%40123@cluster0.j416xnc.mongodb.net/test?retryWrites=true&w=majority";

const startServer = async () => {
    try {
        console.log("Connecting to MongoDB Atlas...");

        await mongoose.connect(MONGO_URI);

        console.log("✅ MongoDB Atlas Connected");

    } catch (err) {
        console.error("❌ Connection failed:", err.message);
        process.exit(1); // 🔥 stop immediately (no fake fallback)
    }
};

startServer();