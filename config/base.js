// config/base.js
module.exports = {
  application: {
    name: "Conference Management",
  },
  server: {
    port: process.env.PORT || 3000,
  },
  logging: {
    level: "info",
  },
};
