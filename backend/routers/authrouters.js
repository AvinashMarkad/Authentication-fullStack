const express = require('express');
const { signup, login } = require('../controllers/authcontroller');
const { signupValidation, loginValidation } = require('../middlewares/authmid');

const router = express.Router();

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

module.exports = router;

