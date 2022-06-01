const mongoose = require('../database');

const VehicleSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: false
    },
    description:{
        type: String,
        unique: false,
        required: false
    },
    licenseplate:{
        type: String,
        unique:true,
        required: true
    },
    manufacturingYear:{
        type:Number,
        required: true,
        unique: false
    }
})
const Vehicle  = mongoose.model('Vehicle',VehicleSchema);

module.exports = Vehicle;
