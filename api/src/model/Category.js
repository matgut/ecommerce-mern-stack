const mongoose = require('mongoose');


const categoryScehma = new mongoose.Schema({
    name : {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});



const Category = mongoose.model('Category', categoryScehma);

module.exports = Category;