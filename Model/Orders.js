const Sequelize = require('sequelize');
const connection = require('../Database/connnection')

const Orders = connection.define('Orders', {

    OrderId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    }, 

    partDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'partDetails',
            key: 'id',
        }
    },
})

module.exports = Orders;