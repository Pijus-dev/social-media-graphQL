import React from "react";

import { Link } from "react-router-dom";
import styles from "./header.module.scss";

const Header = () => (
  <header>
    <div className={styles.nav}>
      <h2>Connect</h2>
      <div className={styles.navLinks}>
        <Link to="/posts">Home</Link>
        <Link to="/">Logout</Link>
      </div>
    </div>
  </header>
);
export default Header;
