const { DataTypes } = require('sequelize');

const db = require('../db/database')

const Candidate = db.define('candidate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    job_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {
    tableName: 'candidate',
  });


module.exports = Candidate;
  
  
  
  
  
  