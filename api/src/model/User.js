const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userScehma = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
},{
    timestamps: true,
    versionKey: false
});

userScehma.statics.encryptPassword = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
}

userScehma.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

const Users = mongoose.model('User', userScehma);

module.exports = Users;