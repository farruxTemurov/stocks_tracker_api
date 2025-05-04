let express = require('express');
let dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
let PORT = process.env.PORT || 9090;

let dbConnect = require("./config/db");
let app = express();
let stockRoutes = require("./routes/stocks.route");

app.use(express.json()); // Parse JSON request body

// http://localhost:3000/stocks/
app.use("/stocks", stockRoutes.router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    dbConnect.MongoDbConnect(); // calling db file function to connect to MongoDB
})