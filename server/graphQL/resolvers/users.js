import User from "../../models/User.js";
import { generateToken } from "../../utlis/generateToken.js";
import { UserInputError } from "apollo-server";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utlis/validators.js";

const usersResolvers = {
  Mutation: {
    //   login user
    async login(parent, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) { 
        return {
          id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        };
      } else {
        throw new UserInputError("Invalid fields", {
          errors: "invalid fields",
        });
      }
    },
    // register user
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // validate user input
      // make user doesnt exist
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new UserInputError("user already exists", {
          errors: {
            username: "user already exists",
          },
        });
      }
      const newUser = await User.create({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      if (newUser) {
        return {
          ...newUser._doc,
          id: newUser._id,
          token: generateToken(newUser._id),
        };
      } else {
        throw new UserInputError("invalid user data");
      }
    },
  },
};
export default usersResolvers;
