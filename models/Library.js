const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Library extends Model{}

Library.init(
    {
    id:{
    Type: DataTypes.INTEGER,
    allowNull: false, 
    primaryKey: true,
    autoincrement: true
    },
    library_name: {
    Type: DataTypes.STRING,
    allowNull: false,
    references:{
    model: 'language',
    key: 'id'
    }
    }
    }
);
    module.exports = Library;
