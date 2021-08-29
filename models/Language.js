const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Language extends Model{}

Language.init(
    {
    id:{
    Type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoincrement: true
    },
    language:{
    type: DataTypes.STRING,
    allowNull: false
}
    },
)

  module.exports=Language;
    