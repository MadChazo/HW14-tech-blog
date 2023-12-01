const { User } = require("../models");

const userData = [
  {
    username: "Username",
    password: "Password",
  },
  {
    username: "Blogger",
    password: "secretshh",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
