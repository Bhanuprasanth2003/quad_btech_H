const express = require('express')
const mongoose = require('mongoose')

const app = express()

// routes importing
const Route = require('./routes/Route.js')

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// view engine
app.set('view engine', 'ejs')

const dbURI = "mongodb+srv://bhanuprasanth3:BRMQPClCcSKUpanc@cluster0.9ustcal.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 3000

mongoose.connect(dbURI)
  .then((result) => {
    console.log('--------------Data base connected---------')
    console.log(`port no : ${PORT}`)
    app.listen(PORT)
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

app.use('/',Route)

app.use((req, res) => {
    res.status(404).send("404 not found")
  })