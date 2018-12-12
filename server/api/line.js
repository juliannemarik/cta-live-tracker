const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/:color', async (req, res, next) => {
  try {
    const color = req.params.color
    const ctaKey = process.env.CTA_KEY
    const url = `http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=${ctaKey}&rt=${color}&outputType=JSON`
    const {data: trains} = await axios.get(url)
    res.json(trains.ctatt.route[0].train)
  } catch (error) {
    next(error)
  }
})
