const express = require('express')
const router = express.Router()

const BankAccountController = require('../controllers/BankAccountController')

router.post('/deposit/:id', BankAccountController.deposit)
router.post('/withdraw/:id', BankAccountController.withdraw)

module.exports = router