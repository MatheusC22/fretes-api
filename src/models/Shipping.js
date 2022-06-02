const mongoose = require('../database');


const ShippingSchema = new mongoose.Schema({
    //referencia a relação de motoristas com shipping 
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true, 
    },
    //referencia a relação de veiculos com shipping 
    vehicle:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    //referencia a relação de cargas com shipping 
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