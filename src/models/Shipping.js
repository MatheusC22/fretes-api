const mongoose = require('../database');


const ShippingSchema = new mongoose.Schema({
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true, 
    },
    vehicle:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    cargo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cargo',
        required: false, 
    }],
    description:{
        type : String,
        required: false,
        unique : false,
    }

});

const Shipping  = mongoose.model('Shipping',ShippingSchema);

module.exports = Shipping;