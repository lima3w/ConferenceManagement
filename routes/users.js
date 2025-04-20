const express = require("express");
const router = express.Router();
const Users = require("../functions/users");

// GET /users/
router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Users.getUsers());
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve users",
            details: err.message,
        });
    }
});

// GET /users/:id
router.get("/:id", async (req, res) => {
    try {
        const user = await Users.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve user by ID",
            details: err.message,
        });
    }
});

// POST /users/
router.post("/", (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        console.log(req.body);
        return res
            .status(400)
            .json({ error: "Request body is missing or empty" });
    }

    res.send(Users.createUser(req.body));
});

module.exports = router;
