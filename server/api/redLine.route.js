const router = require('express').Router()
const { RedLine, BlueLine } = require('../db/index')

router.get('/redLine', async (req, res, next) => {
  try {
    res.send(await RedLine.findAll())
  } catch (error) {
    next(error)
  }
})

router.get('/blueLine', async (req, res, next) => {
  try {
    res.send(await BlueLine.findAll())
  } catch (error) {
    next(error)
  }
})

module.exports = router
