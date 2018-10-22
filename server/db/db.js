const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/cta-live-tracker', {
    logging: false
  }
);
module.exports = db;
