const CommentModel = require("../../../DB/models/Comment");

const createComment = async (req, res) => {
  try {
    const { comment, PostId } = req.body;
    const { name } = req.user;
    const insertedComment = await CommentModel.create({
      commentBody: comment,
      name: name,
      PostId: PostId,
    });
    res.status(200).json({ messege: "inserted", comnt: insertedComment });
  } catch (err) {
    res.status(400).json({ messege: "error in comment" });
  }
};

const getComment = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await CommentModel.findAll({
      where: {
        PostId: postId,
      },
    });

    res.status(200).json({ messege: "success", comments: comments });
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await CommentModel.destroy({
      where: {
        id: commentId,
      },
    });
    res.status(200).json({ messege: "Comment Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ messahe: "error in deleted" });
  }
};

const getAllComment = async (req, res) => {
  try {
    const comments = await CommentModel.findAll({});
    res.status(400).json({ comments: comments });
  } catch (err) {
    res.status(400).json({ messege: "error in fech comment" });
  }
};
const updatedComment = async (req, res) => {
  try {
    const { newcomment, PostId } = req.body;
    await CommentModel.update(
      {
        commentBody: newcomment,
      },
      {
        where: {
          PostId: PostId,
        },
      }
    );
    res.status(200).json({ messege: "updated" });
  } catch (err) {
    res.status(304).json({ messege: "error in updated comment" });
  }
};
module.exports = {
  createComment,
  getComment,
  deleteComment,
  getAllComment,
  updatedComment
};
