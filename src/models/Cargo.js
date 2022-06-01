const mongoose = require('../database');


const CargoSchema = new mongoose.Schema({
    name:{
        type :String,
        required: true,
        unique: false,
    },
    description:{
        type : String,
        required: false,
        unique : false,
    },
    shipping:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping',
        required: false,
    },
    recipientCep:{
        type: String,
        required: true,
        unique: false,
    },
});

const Cargo  = mongoose.model('Cargo',CargoSchema);

module.exports = Cargo;