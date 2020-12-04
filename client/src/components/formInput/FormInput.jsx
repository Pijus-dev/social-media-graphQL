import React from "react";

import styles from "./formInput.module.scss";

const FormInput = ({ handleInputChange, ...otherProps }) => (
  <div className={styles.inputGroup}>
    <input
      onChange={handleInputChange}
      placeholder="username"
      {...otherProps}
    />
  </div>
);
export default FormInput;
