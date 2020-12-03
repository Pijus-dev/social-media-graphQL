import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import typeDefs from "./graphQL/typeDefs.js";
import resolvers from "./graphQL/resolvers/index.js";

dotenv.config();
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`);
});
