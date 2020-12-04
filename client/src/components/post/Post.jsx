import React from "react";
import { ReactComponent as Circles } from "../../img/circles.svg";
import { ReactComponent as Heart } from "../../img/heart.svg";
import { ReactComponent as Comment } from "../../img/comment.svg";
import { Col } from "react-grid-system";

import styles from "./post.module.scss";

const Post = ({ username, image, likes }) => (
  <Col md={9} xs={12} className={styles.postContainer}>
    <div className={styles.postUsername}>
      <p>{username}</p>
      <Circles />
    </div>
    <div
      className={styles.postImage}
      style={{ backgroundImage: `url(${image})` }}
    ></div>
    <div className={styles.likes}>
      <Heart />
      <Comment />
    </div>
    <div className={styles.likedPeople}>
      <span>Liked by</span>{" "}
      <span style={{ fontWeight: "bold" }}>
        {likes.length > 0 && likes[0].username}{" "}
      </span>
      <span>and by other {likes.length} people</span>
    </div>
  </Col>
);
export default Post;
