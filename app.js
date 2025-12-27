const express = require("express")
const dbConnectionHu = require("./database/connection")
const Manxe = require("./modules/manxekodata")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
dbConnectionHu()



app.use(express.json())


app.get("/api",function(req,res){
        res.json({
             message : "Home Page"
        })
    })

app.get("/api/fetch",async function(req,res){
    const data = await Manxe.find()
    res.json({
        data : data
    })

})


app.post("/api/register",async function (req,res){
    const {email,password} = req.body

 
    await Manxe.create
    ({ 
        email : email,
        password : bcrypt.hashSync(password,10) 
    })
    res.json({ 
        message : "User registered successfully"
    })
})

app.post("/api/login",async function (req,res)
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







app.listen(10,function(){
    console.log("Server connected Successfully!!")
})
