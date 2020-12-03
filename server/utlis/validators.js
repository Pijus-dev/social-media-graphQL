export const validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username field is empty";
  }
  if (email.trim() === "") {
    errors.email = "email field is empty";
  } else {
    const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegex)) {
      errors.email = "Email must be valid email address";
    }
  }
  if (password === "") {
    errors.password = "password field is empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (username, email, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username field is empty";
  }
  if (email.trim() === "") {
    errors.email = "email field is empty";
  }
  if (password.trim() === "") {
    errors.username = "username field is empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
