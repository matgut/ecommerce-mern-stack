const express = require('express');
const router = express.Router();
const categoryController = require('../controller/CategoryController');

const { signupValidator, validatorResult, signinValidator } = require('../middleware/validator');

router.post('/', categoryController.addCategory);




module.exports = router;