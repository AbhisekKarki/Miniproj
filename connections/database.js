const mongoose = require("mongoose")
async function dbConnection(){
    await mongoose.connect("mongodb+srv://hack:haha@cluster0.kkzxmxp.mongodb.net/?appName=Cluster0")
    console.log("Db connected successfully!!")

}
module.exports= dbConnection