const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const apiV1Router = require("./routes/api-v1");

// Middleware logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/v1", apiV1Router);

app.all("/api/", (req, res) => {
  res.redirect(301, "/api/v1");
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
