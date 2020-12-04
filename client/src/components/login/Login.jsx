import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import FormInput from "../formInput/FormInput";
import styles from "./login.module.scss";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      token
    }
  }
`;

const Login = ({ setShowRegister, history }) => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const { email, password } = userInput;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login(result.data.login);
      history.push("/posts");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userInput,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <h1>Connect</h1>
        <div className={styles.formGroup}>
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              style={{ border: errors.email && "1px solid red" }}
              name="email"
              value={email}
              handleInputChange={handleInputChange}
              placeholder="email"
            />
            <FormInput
              type="password"
              name="password"
              style={{ border: errors.password && "1px solid red" }}
              value={password}
              handleInputChange={handleInputChange}
              placeholder="password"
            />
            <button>Log In</button>
          </form>
        </div>
      </div>
      <div className={styles.signIn}>
        <p onClick={setShowRegister}>Don't have account? Sign In</p>
      </div>
    </div>
  );
};
export default withRouter(Login);
