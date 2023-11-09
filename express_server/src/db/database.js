const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: `${__dirname}/db.sqlite`,
  define: {
    timestamps: false,
  },
});

dbConnect = async () => {
  try {
    await db.authenticate();
    await db.sync(); 
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = db