const { sequelize } = require("../connection");//instance from connection

const LikeModel = sequelize.define("Like");//create model
module.exports = LikeModel;
