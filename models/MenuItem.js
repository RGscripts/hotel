const mongoose = require ('mongoose');

const menuItemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    taste : {
        type : String,
        enum : ['sweet', 'spicy', 'sour'],
        required : true
    },
    isdrink : { 
        type : Boolean,
        default : false
    },
    ingredients  : {
        type : [String],
        default : []
    },
    numSales : {
        type : Number,
        default : 0
    }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
// Commenting
module.exports = MenuItem;