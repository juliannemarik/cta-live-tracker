const router = require('express').Router()
const {BlueLine} = require('../db/index')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(await BlueLine.findAll())
  } catch (error) {
    next(error)
  }
})
