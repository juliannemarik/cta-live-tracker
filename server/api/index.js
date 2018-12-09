const router = require('express').Router()
module.exports = router

router.use('/redLine', require('./redLine'))
router.use('/blueLine', require('./blueLine'))

