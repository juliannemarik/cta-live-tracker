const router = require('express').Router()
const { RedLine } = require('../db/index')

router.get('/redLine', async (req, res, next) => {
  try {
    res.send(await RedLine.findAll())
  } catch (error) {
    next(error)
  }
})

module.exports = router
