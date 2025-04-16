require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const config = require(`../config/${env}.js`);

module.exports = config;
