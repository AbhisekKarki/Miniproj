const express = require("express")
const dbConnection = require("./modules/manxekodata")
const app = express()
const bcrypt = require("bcrypt")
const Manxe = require("./modules/manxekodata")
require("dotenv").config()
const jwt = require("jsonwebtoken")


dbConnection()
app.use(express.json())

app.get("/api",function(req,res){
    res.json({
        message: "home page"
    })
})


 app.get("/api/fetch",async function(req,res){
    
   const data =  await Manxe.find()
   res.json({
    data : data 
   })
})

app.post("/api/register",async function (req,res){
    const {email,password} = req.body

 
    await Manxe.create({ 
        email : email,
        password : bcrypt.hashSync(password,10) 
    })
    res.json({ 
        message : "User registered successfully"
    })
})


app.post("/api/login",async function userLogin(req,res)
{
    const {email,password} = req.body
    const data = await Manxe.findOne({email:email})
    if(!data)
    {
        res.json({
            message : "Not registered"
        })
    }
    else{
        const isWatched = bcrypt.compareSync(password,data.password)
        if(isWatched)
        {
           const token = jwt.sign({email : Manxe.email},process.env.JWT_SECRET,{
                    expiresIn : "1d"
            })
            res.json({

                message : "Logged in successfully",
                token : token
                
            })
        }
        else{
            res.json({
                message : "Invalid Password"
            })
        }

    }
})


 




app.listen(80,function(){
    console.log("server has started at port 80")
})

