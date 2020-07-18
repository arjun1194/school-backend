const Album = require('./Album')
const Photo = require('./Photo')
const User = require('./User')



//Add Associations here
Album.hasMany(Photo,{ foreignKey: { allowNull: false }, onDelete: 'CASCADE' })


module.exports = {Album,Photo,User}








