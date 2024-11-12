const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    throw new Error("Please fill in all the details.");
  }
  if (firstName.length > 20 || lastName.length > 20) {
    throw new Error(
      "First name and last name must be less than 20 characters."
    );
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address.");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough.");
  }
};

module.exports = {
  validateSignUp,
};
