const express = require('express')
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth.routes')
const interviewRouter = require("./routes/interview.routes")
const cors = require("cors")

const app = express()

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173"
].filter(Boolean)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
            callback(null, true)
        } else {
            callback(null, true)
        }
    },
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app
