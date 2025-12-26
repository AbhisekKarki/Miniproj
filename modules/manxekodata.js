const mongoose = require("mongoose")
const schema = mongoose.Schema
const manxeSchema = new schema({
    email : String,
    password : String

})
const Manxe = mongoose.model("Manxe",manxeSchema)
module.exports = Manxe



