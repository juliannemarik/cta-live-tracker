const router = require('express').Router()
const {RedLine} = require('../db/index')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(await RedLine.findAll())
  } catch (error) {
    next(error)
  }
})
