const jwt = require("jsonwebtoken");

const generarteToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generarteToken;
