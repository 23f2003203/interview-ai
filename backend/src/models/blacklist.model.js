const mongoose = require("mongoose")
const { applyTimestamps } = require("./user.model")


const blacklistTotalSchema = new mongoose.Schema({
    token:{
        type:String,
        required: [true,"token is required to be added in the blacklist"]
    }
},{
    timestamps:true
})

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistTotalSchema)

module.exports = tokenBlacklistModel