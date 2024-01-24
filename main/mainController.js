const axios = require("axios")
const CryptoData = require('../models/DataSchema')


const home_page = async (req, res) => {
    try {
        // fetching the data 
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers')
        const res_data = await response.data

        // slice upto 10
        const result = Object.values(res_data).slice(0, 10)

        // creating an array 
        const cryptoDataArray = result.map((data) => new CryptoData(data))

        // store the data in DB 
        await CryptoData.insertMany(cryptoDataArray)

        // processing  the data

        var storedData = await CryptoData.find().sort({_id:-1}).limit(10)
        
        storedData.reverse()

        const processedData = []

        storedData.forEach((data) => {
            var { base_unit, name, buy, sell, volume, open, low, high, last } = data;
            base_unit = base_unit.toUpperCase()
            // Create an object containing the processed data for each base unit
            const processedDoc = {
                baseUnit: base_unit,
                name: name,
                buy: buy,
                sell: sell,
                volume: volume,
                open: open,
                low: low,
                high: high,
                last: last,
            }

            processedData.push(processedDoc)
        })

            CryptoData.deleteMany({})

            res.render('index',{data:processedData})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal error fetching and storing data')
        }
    }

module.exports = { home_page }