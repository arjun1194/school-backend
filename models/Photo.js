const Sequelize = require('sequelize');
const db = require('../config/database');


const Photo  = db.define('photos', {
    // attributes
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    storageId: {
        type: Sequelize.STRING,
        allowNull:false
    },

});

module.exports = Photo;
