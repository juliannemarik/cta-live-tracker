const Sequelize = require('sequelize')
const db = require('../db')

const BlueLineTrains = db.define('blueLine', {
  rn: {
    type: Sequelize.INTEGER
  },
  destSt: {
    type: Sequelize.INTEGER
  },
  destNm: {
    type: Sequelize.STRING
  },
  trDr: {
    type: Sequelize.INTEGER
  },
  nextStaId: {
    type: Sequelize.INTEGER
  },
  nextStpId: {
    type: Sequelize.INTEGER
  },
  nextStaNm: {
    type: Sequelize.STRING
  },
  prdt: {
    type: Sequelize.DATE
  },
  arrT: {
    type: Sequelize.DATE
  },
  isApp: {
    type: Sequelize.INTEGER
  },
  isDly: {
    type: Sequelize.INTEGER
  },
  flags: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lon: {
    type: Sequelize.FLOAT
  },
  heading: {
    type: Sequelize.INTEGER
  }
})

module.exports = BlueLineTrains
