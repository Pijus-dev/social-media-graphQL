import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import FormInput from "../formInput/FormInput";
import styles from "./register.module.scss";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`;

const Register = ({ history }) => {
  const context = useContext(AuthContext);
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { username, email, password, confirmPassword } = userInput;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      context.login(result.data.register);
      history.push("/posts");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userInput,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <h1>Connect</h1>
        <div className={styles.formGroup}>
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              placeholder="username"
              style={{ border: errors.username && "1px solid red" }}
              name="username"
              value={username}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="email"
              placeholder="email"
              style={{ border: errors.email && "1px solid red" }}
              name="email"
              value={email}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="password"
              placeholder="password"
              style={{ border: errors.password && "1px solid red" }}
              name="password"
              value={password}
              handleInputChange={handleInputChange}
            />
            <FormInput
              type="password"
              placeholder="confirmPassword"
              style={{ border: errors.confirmPassword && "1px solid red" }}
              name="confirmPassword"
              value={confirmPassword}
              handleInputChange={handleInputChange}
            />
            <button>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Register);
