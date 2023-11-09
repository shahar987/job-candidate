const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const db = require('../db/database')

const User = db.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'user',
  });
  
//encrypt the password before save
User.beforeCreate(async(user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
});

User.addHook

module.exports = User;
  
  
  
  
  
  