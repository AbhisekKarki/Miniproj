const mongoose = require("mongoose")
async function dbConnectionHu(){
    await mongoose.connect("mongodb+srv://lya:aloo@cluster0.aqbzzui.mongodb.net/?appName=Cluster0")
    console.log("Db connected")
}
module.exports = dbConnectionHu