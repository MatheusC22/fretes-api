
const mongoose = require('mongoose');
//mongoose.connect('mongodb+srv://ponto-api:ponto-api-key@cluster0.a7mwr.mongodb.net/ponto-turisticos?retryWrites=true&w=majority'); 
mongoose.connect('mongodb://127.0.0.1:27017/frete-db');

mongoose.Promise = global.Promise;

module.exports = mongoose;