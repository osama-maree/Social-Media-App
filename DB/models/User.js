const { sequelize } = require("../connection");
const { DataTypes } = require("sequelize");
const PostModel = require("./Post");
const LikeModel = require("./Like");
const UserModel = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    enum: ["Female", "Male"],
    defaultValue: "Male",
  },
  confirmEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  sendCode: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  PofilePic:{
    type:DataTypes.STRING
  }
});
UserModel.hasMany(PostModel);
PostModel.belongsTo(UserModel);
UserModel.hasMany(LikeModel)
LikeModel.belongsTo(UserModel)
module.exports = UserModel;
