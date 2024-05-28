var jwt = require("jsonwebtoken");
const secret = "mosajjid";

const setUser = async (user) => {
  return jwt.sign(user, secret);
};
const getUser = async (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  setUser,
  getUser,
};
