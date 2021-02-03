const User = require('../model/User');
const jwt = require('jsonwebtoken');
const config = require('../config');


exports.signup = async (req, res) => {
    const { username, email, password} = req.body;
    try {
        const user = await User.findOne({ email: email });

        if(user) return res.status(403).json({
            code: 1,
            status: 'Error',
            message: 'Email already exists' 
        });

        const newUser = new User({
            username: username,
            email: email,
            password: await User.encryptPassword(password)
        });

        const savedUser = await newUser.save();

        res.json({
            code: 0,
            status: 'Success',
            message: 'Registration success, please signin.'
        });

    } catch (error) {
        console.log('signupController error: ',error)
    }
}

exports.signin = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email: email });

        if(!user) return res.status(400).json({
            code: 1,
            status: 'Error',
            message: 'Invalid credentials' 
        });

        const matchPassword = await User.comparePassword(password, user.password);
        const {_id, username, role } = user;
        
        if(!matchPassword) return res.status(400).json({
            code: 1,
            status: 'Error',
            message: 'Invalid credentials' 
        });

        
        const token = jwt.sign({id: _id}, config.secretJwt, { expiresIn: config.expireJwt });//24 hrs

        


        res.json({
            code: 0,
            status: 'Success',
            message: 'OK',
            result: {
                token: token,
                user: { id: _id, username: username, email: email, role: role }
            }
        });

    } catch (error) {
        console.log('signinController error: ',error)
    }
}