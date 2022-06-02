const mongoose = require("../database");

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
  },
  birthdate: {
    type: Date,
    unique: false,
    required: true,
  },
});

const Driver = mongoose.model("Driver", DriverSchema);

module.exports = Driver;
