const mongoose = require("../database");

const CargoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  //referencia a relação de 1-N com o modelo de shipping
  shipping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipping",
    required: false,
  },
  recipientCep: {
    type: String,
    required: true,
    unique: false,
  },
});

const Cargo = mongoose.model("Cargo", CargoSchema);

module.exports = Cargo;
