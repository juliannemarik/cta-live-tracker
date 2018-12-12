const Sequelize = require('sequelize')
const db = require('../db')

const Lines = db.define('lines', {
  color: {
    type: Sequelize.STRING
  },
})

module.exports = Lines
