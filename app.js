const express = require("express")
const dbConnectionHu = require("./database/connection")
const Manxe = require("./modules/manxekodata")
const cors = require("cors")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require("path")
require("dotenv").config()
dbConnectionHu()


app.use(express.json())
 app.use(express.urlencoded({extended : true}))// to understand data by node js if it is from server site render
app.set('view engine','ejs')



app.get("/api/register",function(req,res){
        res.render('register')
    })



app.get("/api/log",function(req,res){
        res.render('login')
    })

app.get("/api/fetch",async function(req,res){
    const data = await Manxe.find()
    res.json({
        data : data
    })   
})

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );



app.post("/api/register", async function (req,res){
    console.log(req.body)
    const {username,email,password,password1} = req.body




 
    await Manxe.create
    ({ 
        username : username,
        email : email,
        password : bcrypt.hashSync(password,10), 
        password1 : bcrypt.hashSync(password1,10) 
    })
    res.send({ 
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
            console.log(token)
        }
        else{
            res.json({
                message : "Invalid Password"
            })
        }

    }
})




app.use(express.static('public/js'))// to link external css and give access to public


app.listen(3000,function(){
    console.log("Server connected Successfully!!")
})
