import React, { useEffect, useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Header from "../../components/header/Header";
import Post from "../../components/post/Post";
import { AuthContext } from "../../context/auth";
import { Container, Col, Row } from "react-grid-system";
import styles from "./posts.module.scss";

const fetchPosts = gql`
  {
    getPosts {
      id
      body
      image
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

const PostsPage = ({ history }) => {
  const { loading, data } = useQuery(fetchPosts);
  const { user, logout } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!user) {
  //     history.push("/");
  //   }
  // }, [history, user]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.postContainer}>
        <Row style={{ width: "700px" }}>
          <Col md={9} xs={12} className={styles.addPost}>
            <div className={styles.formInput}>
              <input type="text" placeholder="Add post..." />
            </div>
            <div className={styles.fileInput}>
              <label htmlFor="file-input">
                <i className="fas fa-images"></i>
              </label>
              <input type="file" id="file-input" />
            </div>
            <i className="fas fa-paper-plane"></i>
          </Col>
        </Row>
      </div>
      <div className={styles.wrapper}>
        <Row style={{ width: "700px" }}>
          {!loading &&
            data.getPosts.map(({ username, body, image, id, likes }) => (
              <Post key={id} username={username} image={image} likes={likes} />
            ))}
        </Row>
      </div>
    </div>
  );
};
export default PostsPage;
