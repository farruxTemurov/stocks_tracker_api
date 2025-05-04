const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    currency: String,
    description: String,
    displaySymbol: String,
    figi: String,
    mic: String,
    symbol: { type: String, unique: true },
    type: String
});

module.exports = mongoose.model('Stock', stockSchema);
