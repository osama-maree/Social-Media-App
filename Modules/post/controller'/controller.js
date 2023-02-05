const LikeModel = require("../../../DB/models/Like");
const PostModel = require("../../../DB/models/Post");

const getAllPost = async (req, res) => {
  try {
    const posts = await PostModel.findAll({
      include: [LikeModel], // join Posts, Likes on Posts.id = Likes.PostId
    });

    const likedPosts = await LikeModel.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json({ listOfPosts: posts, likedPosts: likedPosts });
  } catch (err) {
    res.status(400).json({ messege: "error", error: err });
  }
};
const createPost = async (req, res) => {
  try {
    const { bodyPost } = req.body; // get post body

    const post = await PostModel.create({
      bodyPost: bodyPost,
      UserId: req.body.id, //from auth middleware
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ messege: "there is an error" });
  }
};
const updatePost = async (req, res) => {
  try {
    const { newBody, postId } = req.body;
    const updatedPost = await PostModel.update(
      { bodyPost: newBody },
      { where: { id: postId } }
    );
    res.status(200).json("Post's body updated: " + updatedPost);
  } catch (err) {
    res.status(304).json({ messege: "there error from updated post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const deletedPost = await PostModel.destroy({
      where: {
        id: postId,
      },
    });
    res.status(200).json({ deletedPost });
  } catch (err) {
    res.status(400).json({ messege: "there  is an error from delete post" });
  }
};
module.exports = {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
};
