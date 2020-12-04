import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { Container, Col, Row } from "react-grid-system";
import styles from "./posts.module.scss";

const fetchPosts = gql`
  {
    getPosts {
      id
      body
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

const PostsPage = () => {
  const { loading, data } = useQuery(fetchPosts);

  return (
    <div className={styles.wrapper}>
      <Row style={{ width: "700px" }}>
        {!loading &&
          data.getPosts.map(({ username, body }) => (
            <Col md={9} xs={12} className={styles.postContainer}>
              <div className={styles.postUsername}>
                <p>{username}</p>
              </div>
              <div>{body}</div>
            </Col>
          ))}
      </Row>
    </div>
  );
};
export default PostsPage;
