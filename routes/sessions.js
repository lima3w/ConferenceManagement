const express = require("express");
const router = express.Router();

const Sessions = require("../functions/sessions");

// GET /sessions/
router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Sessions.getSessions());
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve sessions",
            details: err.message,
        });
    }
});

// GET /sessions/:id
router.get("/:id", async (req, res) => {
    try {
        const session = await Sessions.getSessionById(req.params.id);
        if (!session)
            return res.status(404).json({ error: "Session not found" });
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve session by ID",
            details: err.message,
        });
    }
});

// POST /sessions/
router.post("/", (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        console.log(req.body);
        return res
            .status(400)
            .json({ error: "Request body is missing or empty" });
    }

    res.send(Sessions.createSession(req.body));
});

module.exports = router;
