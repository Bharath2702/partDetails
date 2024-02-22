const Sequelize = require('sequelize');
const connection = require('../Database/connnection')

const partDetails = connection.define('partDetails', {

    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    itemName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    itemNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    rating: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    reviewCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull:false,
    },
});

partDetails.hasMany(require('../Model/Orders'), { foreignKey: 'partDetailId' });


module.exports = partDetails;