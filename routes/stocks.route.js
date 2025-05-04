let express = require("express");
let router = express.Router();  // Create a new router object
let stockController = require("../controllers/stocks.controller");

router.post("/store", stockController.storeStock); // Route to store stock
router.get("/findAll", stockController.findAllStocks); // Route to find all stocks
router.get("/searchStockBySymbol", stockController.searchBySymbol); // Route to seach one stock by symbol
router.get("/findAllFromDb", stockController.findAllFromDb); 

module.exports = {
    router
}