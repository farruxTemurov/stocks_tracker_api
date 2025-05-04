const stockService = require('../services/stocks.service');

const storeStock = async (req, res) => {
    const { symbol } = req.body;
    if (!symbol) {
        return res.status(400).json({ error: 'Symbol is required' });
    }

    try {
        const stock = await stockService.storeStock(symbol);
        res.status(201).json({ message: 'Stock stored successfully', stock });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const findAllStocks = async (req, res) => {
    try {
        const allStocks = await stockService.findAllStocks();
        res.status(200).json(allStocks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch all stocks' });
    }
};

const searchBySymbol = async (req, res) => {
    const { symbol } = req.query;
    if (!symbol) {
        return res.status(400).json({ error: 'Symbol query parameter is required' });
    }

    try {
        const stockData = await stockService.searchBySymbol(symbol);
        res.status(200).json(stockData);
    } catch (error) {
        console.error('Error searching stock:', error.message);
        res.status(404).json({ error: error.message });
    }
};

const findAllFromDb = async (req, res) => {
    try {
        const stocks = await stockService.findAllFromDb();
        res.status(200).json(stocks);
    } catch (error) {
        console.error('Error fetching stocks from DB:', error.message);
        res.status(500).json({ error: 'Failed to fetch stocks from DB' });
    }
};

module.exports = {
    storeStock,
    findAllStocks,
    searchBySymbol,
    findAllFromDb
};
