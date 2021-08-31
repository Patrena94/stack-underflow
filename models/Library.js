const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Language = require('./Language');

class Library extends Model{}

Library.init(
    {
    id:{
    type: DataTypes.INTEGER,
    allowNull: false, 
    primaryKey: true,
    autoincrement: true
    },
    library_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
        len:[1]
    }
},
    language_id:{
    type: DataTypes.INTEGER,
    references:{
    model: 'language',
    key: 'id'
    }
    }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'library'
      }
);
    module.exports = Library;
