import Post from "../../models/Post.js";
import { AuthenticationError, UserInputError } from "apollo-server";
import { protect } from "../../middlewares/authMiddleware.js";
import User from "../../models/User.js";

const postsResolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return posts;
      } catch (e) {
        throw new Error(err);
      }
    },
    async getPost(parent, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("post not found");
        }
      } catch (e) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(parent, { body }, context) {
      const decodedToken = protect(context);
      const user = await User.findById(decodedToken.id).select("-password");
      if (body.trim() === "") {
        throw new UserInputError("Post body must not be empty");
      }
      if (user) {
        const newPost = await Post.create({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        return newPost;
      }
    },
    async deletePost(parent, { postId }, context) {
      const decodedToken = protect(context);
      const user = await User.findById(decodedToken.id).select("-password");
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post was deleted successfully";
        } else {
          throw new AuthenticationError(
            "You are not allowed to delete this post"
          );
        }
      } catch (e) {
        throw new AuthenticationError("Error");
      }
    },
    async likePost(parent, { postId }, context) {
      const decodedToken = protect(context);
      const { username } = await User.findById(decodedToken.id).select(
        "-password"
      );
      const post = await Post.findById(postId);
      const likedPost = post.likes.find((like) => like.username === username);
      if (post) {
        if (likedPost) {
          // already liked
          post.likes = post.likes.filter((like) => like.username !== username);
          await post.save();
        } else {
          // not liked
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      }
    },
  },
};

export default postsResolvers;
