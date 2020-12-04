import React, { useState } from "react";

import styles from "./homepage.module.scss";
import phone from "../../img/phoneScreen.jpg";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";

const HomePage = ({ history }) => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainBlock}>
        <div className={styles.phone}>
          <img src={phone} alt="phone screen" />
        </div>
        {showRegister ? (
          <Register />
        ) : (
          <Login setShowRegister={() => setShowRegister(true)} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
