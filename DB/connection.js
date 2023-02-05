const { Sequelize } = require("sequelize");
//create connection with database
//use env to store important information
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.password,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  }
);

const connectDB = async () => {
  return await sequelize
    .sync({ alter: true }) //use alter:true to allow updating on model or table
    .then((res) => console.log("connectDB"))
    .catch((err) => console.log("DisConnect", err));
};

module.exports = { sequelize, connectDB };//export connection and function create connection
