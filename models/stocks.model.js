const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    currency: String,
    description: String,
    displaySymbol: String,
    figi: String,
    mic: String,
    symbol: { type: String, unique: true }, //unique: true ensures the symbol won't be duplicate 
    type: String
});

module.exports = mongoose.model('Stock', stockSchema);
