const Sequelize = require('sequelize');
const db = require('../config/database');


const User  = db.define('user', {
    // attributes
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail:true
        }

    },
    password: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
            min:3,
            max:25
        }
    },


});

module.exports = User;
