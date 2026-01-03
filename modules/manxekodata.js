const mongoose = require("mongoose")
const schema = mongoose.Schema
const manxeSchema = new schema({
    username:String,
    email : String,
    password : String,
    password1: String


})
const Manxe = mongoose.model("Manxe",manxeSchema)
module.exports = Manxe



