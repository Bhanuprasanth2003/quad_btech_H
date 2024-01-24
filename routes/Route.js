const express = require('express')
const router = express.Router()
const {home_page} = require('../main/mainController.js')

router.get('/',home_page)

module.exports = router