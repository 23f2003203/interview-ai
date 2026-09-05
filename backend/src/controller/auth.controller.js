const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

const JWT_SECRET = process.env.JWT_SECRET || "default_super_secret_jwt_key_123"

const getCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
});

async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "please provide username, email and password"
            })
        }
        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "Acount already exists with this username or email"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            username,
            email,
            password: hash
        })

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, getCookieOptions())

        res.status(201).json({
            message: "user registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })
    } catch (err) {
        console.error("Register Error:", err)
        res.status(500).json({
            message: err.message || "Error registering user"
        })
    }
}

async function loginUserController(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.cookie("token", token, getCookieOptions())
        res.status(200).json({
            message: "user logged in successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.error("Login Error:", err)
        res.status(500).json({
            message: err.message || "Error logging in"
        })
    }
}

async function logoutUserController(req, res) {
    try {
        const token = req.cookies?.token

        if (token) {
            await tokenBlacklistModel.create({ token })
        }

        res.clearCookie("token", getCookieOptions())
        res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (err) {
        console.error("Logout Error:", err)
        res.status(500).json({
            message: err.message || "Error logging out"
        })
    }
}

async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            message: "User details fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.error("getMe Error:", err)
        res.status(500).json({
            message: err.message || "Error fetching user details"
        })
    }
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}