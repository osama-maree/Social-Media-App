
const authRouter=require('./auth/auth.router')
const userRouter=require('./user/user.router')
const postRouter=require('./post/post.router')
const commentRouter=require('./comment/comment.router')
const likeRouter=require('./like/like.router')
module.exports={
    authRouter,
    userRouter,
    postRouter,
    commentRouter,
    likeRouter
}