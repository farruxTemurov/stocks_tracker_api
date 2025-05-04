const axios = require('axios');
const stockRepository = require('../repositories/stocks.repository');
require('dotenv').config();

const FINNHUB_API_URL = process.env.FINNHUB_API_URL;
const API_KEY = process.env.API_KEY;

// Service: store a stock by symbol
const storeStock = async (symbol) => {
    const response = await axios.get(`${FINNHUB_API_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);
    const stockData = response.data;

    if (!stockData.ticker) {
        throw new Error('Stock not found on Finnhub');
    }

    const existing = await stockRepository.findBySymbol(stockData.ticker);

    if (existing) {
        throw new Error('Stock already stored');
    }

    const savedStock = await stockRepository.saveStock({
        symbol: stockData.ticker,
        name: stockData.name,
        currency: stockData.currency,
        exchange: stockData.exchange,
        industry: stockData.finnhubIndustry,
        marketCap: stockData.marketCapitalization,
        country: stockData.country,
        ipo: stockData.ipo,
        logo: stockData.logo,
        weburl: stockData.weburl,
        phone: stockData.phone
    });
    return savedStock;
};

// Service: fetch all stocks from Finnhub (live, no DB)
const findAllStocks = async () => {
    const response = await axios.get(`${FINNHUB_API_URL}/stock/symbol?exchange=US&token=${API_KEY}`);
    console.log("Stocks data fetched from server:", response.data.length, "stocks");
    return response.data;
};

// Service: search stock by symbol from Finnhub (live, no DB)
const searchBySymbol = async (symbol) => {
    try {
        const response = await axios.get(`${FINNHUB_API_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`);

        // Log the full response to check if data is returned
        console.log("Finnhub Response:", response.data);

        const stockData = response.data;

        // Check for 'ticker' instead of 'symbol'
        if (!stockData.ticker) {
            throw new Error('Stock not found');
        }

        return stockData;
    } catch (error) {
        console.error('Error in searchBySymbol:', error.message);
        throw error;  // Re-throw the error to propagate it to the controller
    }
};


const findAllFromDb = async () => {
    return await stockRepository.findAllFromDb();
};

module.exports = {
    storeStock,
    findAllStocks,
    searchBySymbol,
    findAllFromDb
};
