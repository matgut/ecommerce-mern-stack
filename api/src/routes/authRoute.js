const express = require('express');
const router = express.Router();
const signupController = require('../controller/AuthController');

const { signupValidator, validatorResult, signinValidator } = require('../middleware/validator');

router.post('/signup', signupValidator, validatorResult, signupController.signup);
router.post('/signin', signinValidator, validatorResult, signupController.signin);




module.exports = router;

