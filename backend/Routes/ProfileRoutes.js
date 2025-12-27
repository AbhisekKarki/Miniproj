
const ensureAuthenticated =  require('../Middleware/Auth');
const router = require('express').Router();



router.get('/',ensureAuthenticated, (req,res) =>{
    res.json({
        message: "Welcome user",
        user : req.user
    });
});

module.exports = router ;
