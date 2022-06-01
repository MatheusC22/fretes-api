
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://frete_admin:frete123@frete-db.ay5da.mongodb.net/?retryWrites=true&w=majority'); 
//mongoose.connect('mongodb://127.0.0.1:27017/frete-db');

mongoose.Promise = global.Promise;

module.exports = mongoose;