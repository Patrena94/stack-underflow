const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Language extends Model{}

Language.init(
    {
    id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoincrement: true
    },
    language_name:{
    type: DataTypes.STRING,
    allowNull: false
}
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'language'
      }
      ),
  module.exports=Language;
    