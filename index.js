const express = require("express");
// import cors from "cors";
const cors = require("cors");
const app = express();

const port = 3000;
app.use(express.json());
const apiV1Router = require("./routes/api-v1");
app.use(cors());
// app.use(cors({
//   origin: 'https://your-frontend-domain.com',
//   credentials: true, // if using cookies or auth headers
// }));

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
