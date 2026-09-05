const mongoose = require('mongoose')
const dns = require('dns')

// Set DNS servers to public DNS (Google / Cloudflare) to fix querySrv ECONNREFUSED error on local network DNS
dns.setServers(['8.8.8.8', '1.1.1.1'])

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database")
    }
    catch (err) {
        console.log("Database connection error:", err)
        throw err
    }
}

module.exports = connectToDB
