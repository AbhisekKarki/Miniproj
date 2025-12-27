const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require("./Routes/Authroutes");
const ProfileRouter = require("./Routes/ProfileRoutes");
const path = require('path');


require('dotenv').config();
require('./Models/db')
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});


app.use('/auth', AuthRouter);
app.use('/profile', ProfileRouter);


app.listen(3000, () =>{
    console.log("Server is running at http://localhost:3000");
});
