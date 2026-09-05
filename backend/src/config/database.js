const mongoose = require('mongoose')
const dns = require('dns')

let isConnected = false

async function connectToDB() {
    if (isConnected || mongoose.connection.readyState === 1) {
        return
    }

    try {
        if (process.env.NODE_ENV !== "production") {
            try {
                dns.setServers(['8.8.8.8', '1.1.1.1'])
            } catch (e) {
                console.log("DNS setServers warning:", e.message)
            }
        }

        if (!process.env.MONGO_URI) {
            console.error("CRITICAL: MONGO_URI is missing in environment variables!")
            return
        }

        await mongoose.connect(process.env.MONGO_URI)
        isConnected = true
        console.log("Connected to database")
    }
    catch (err) {
        console.error("Database connection error:", err)
    }
}

module.exports = connectToDB
