const { signup, login } = require('../Controllers/AuthControllers');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');

const router = require('express').Router();



router.post('/register', signupValidation , signup);
router.post('/login', loginValidation, login);

module.exports = router;  
