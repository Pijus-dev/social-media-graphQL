import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

export const protect = (context) => {
  let token;

  if (
    context.req.headers.authorization &&
    context.req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = context.req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_TOKEN);
     
      return user;
    } catch (e) {
      throw new AuthenticationError("Not authorized");
    }
  } else {
    throw new AuthenticationError("Not authorized");
  }
};
