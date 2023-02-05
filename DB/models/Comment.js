const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const CommentModel = sequelize.define("comment", {
  commentBody: {
    type: DataTypes.STRING,
   allowNull:false
  },
  name: {
    type: DataTypes.STRING,
   allowNull:false
  },
});
module.exports = CommentModel;
