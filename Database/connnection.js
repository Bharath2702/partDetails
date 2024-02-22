const Sequelize = require('sequelize');
const connection = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    
});

module.exports = connection;