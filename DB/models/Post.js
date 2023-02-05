const { sequelize } = require("../connection");//instance from connection
const { DataTypes } = require("sequelize");
const CommentModel = require("./Comment");//import commentModel for crate relation or use model object contains all model
const LikeModel = require("./Like");
const PostModel = sequelize.define("Post", {
  bodyPost: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
//create relation with other model
PostModel.hasMany(CommentModel);
CommentModel.belongsTo(PostModel);
PostModel.hasMany(LikeModel);
LikeModel.belongsTo(PostModel);
module.exports = PostModel;
