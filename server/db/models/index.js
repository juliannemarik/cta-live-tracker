const Trains = require('./trains')
const Lines = require('./lines')

Trains.belongsTo(Lines, {as: 'lineColor'})

module.exports = {
  Trains,
  Lines
}
