const express = require('express')
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth.routes')
const interviewRouter = require("./routes/interview.routes")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        return callback(null, origin);
    },
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app
