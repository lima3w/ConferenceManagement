// config/development.js
const baseConfig = require("./base");

module.exports = {
  ...baseConfig,
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/conferencemgmt",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  logging: {
    ...baseConfig.logging,
    level: "debug", // Override base config for development
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "dev-secret-key",
    expiresIn: "1d",
  },
};
