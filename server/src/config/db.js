const mongoose = require("mongoose");

const connectDB = async () => {
    if (process.env.DISABLE_DB === "true") {
        console.log("Database connection disabled; continuing without a database.");
        return;
    }

    const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URI_FALLBACK || "mongodb://127.0.0.1:27017/Employee_Management";

    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 30000,
            family: 4,
            autoIndex: true,
        });

        console.log("Database connected successfully");
    } catch (error) {
        const message = error?.message || String(error);

        console.warn("Database connection unavailable; continuing without a database.");
        console.warn(`Mongo URI: ${mongoUri}`);
        console.warn(`Error: ${message}`);

        if (/whitelist|ip address|network access|timed out/i.test(message)) {
            console.warn("Atlas access is likely being blocked by network or IP whitelist settings. Please allow your current IP in Atlas Network Access.");
        }
    }
};

module.exports = connectDB;
