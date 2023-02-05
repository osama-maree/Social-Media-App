const { sequelize } = require("../../../DB/connection");
const LikeModel = require("../../../DB/models/Like");

const getAllLikes = async (req, res) => {
  try {
    const UserId = req.user.id;
    const likedPosts = await LikeModel.findAll({
      where: {
        UserId: UserId,
      },
    });
    let likedPostsIDs = likedPosts.map((post) => post.PostId);

    res.status(200).json({
      messege: "success,this is id for post Liked",
      postId: likedPostsIDs,
    });
  } catch (err) {
    res.status(400).json({ messege: "error from likes" });
  }
};

const createLike = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { PostId } = req.body;

    let action;
    let insertedLike;

    const found = await LikeModel.findOne({
      where: {
        UserId: UserId,
        PostId: PostId,
      },
    });
    if (!found) {
      action = "LIKE";
      insertedLike = await LikeModel.create({ PostId: PostId, UserId: UserId });
    } else {
      action = "UNLIKE";
      insertedLike = found;
      await LikeModel.destroy({
        where: {
          UserId: UserId,
          PostId: PostId,
        },
      });
    }

    res.status(200).json({ action: action, Like: insertedLike });
  } catch (err) {
    res.status(400).json({ messege: "eorror from like post" });
  }
};

const numerLikeEachPost=async(req,res)=>{
    try{
    const num = await LikeModel.findAll({
      attributes: [
        "PostId",
        [sequelize.fn("COUNT", sequelize.col("PostId")), "count"],
      ],
      group: ["PostId"],
    });
    res.status(200).json({numerLike:num})
}catch(err){
    res.status(400).json({messege:"error from number like"})
}
}
module.exports = {
  getAllLikes,
  createLike,
  numerLikeEachPost
};
