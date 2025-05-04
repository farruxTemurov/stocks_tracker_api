const Stock = require('../models/stocks.model');

const findBySymbol = async (symbol) => {
    return await Stock.findOne({ symbol });
};

const saveStock = async (stockData) => {
    const stock = new Stock(stockData);
    return await stock.save();
};

const findAllFromDb = async () => {
    return await Stock.find();
};

module.exports = {
    findBySymbol,
    saveStock,
    findAllFromDb
};
