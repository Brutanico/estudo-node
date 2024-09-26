const { Sequelize } = require('sequelize');

// Conectar ao SQLite em memória
const sequelize = new Sequelize('sqlite::memory:');

module.exports = sequelize