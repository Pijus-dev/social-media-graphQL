import React from "react";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { BrowserRouter } from "react-router-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
export default (
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);
