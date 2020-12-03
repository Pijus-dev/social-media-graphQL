import { UserInputError } from "apollo-server";
import { AuthenticationError } from "apollo-server";
import Post from "../../models/Post.js";
import User from "../../models/User.js";

import { protect } from "../../middlewares/authMiddleware.js";

const commentsResolver = {
  Mutation: {
    async createComment(parent, { postId, body }, context) {
      const decodedToken = protect(context);
      const user = await User.findById(decodedToken.id).select("-password");
      if (body.trim() === "") {
        throw UserInputError("empty comment", {
          errors: {
            body: "coomment must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw UserInputError("Post not found");
      }
    },
    async deleteComment(parent, { postId, commentId }, context) {
      const decodedToken = protect(context);
      const { username } = await User.findById(decodedToken.id).select(
        "-password"
      );
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post; 
        } else {
          throw new AuthenticationError("action not allowed");
        }
      } else {
        throw new UserInputError("post not found");
      }
    },
  },
};
export default commentsResolver;
