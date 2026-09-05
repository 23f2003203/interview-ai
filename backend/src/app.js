const express = require('express')
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth.routes')
const interviewRouter = require("./routes/interview.routes")
const cors = require("cors")
const connectToDB = require('./config/database')

const app = express()

// Ensure DB is connected on each serverless invocation
app.use(async (req, res, next) => {
    await connectToDB()
    next()
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        callback(null, origin);
    },
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app
