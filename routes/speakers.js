const express = require("express");
const router = express.Router();

const Speakers = require("../functions/speakers");

// GET /speakers/
router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Speakers.getSpeakers());
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve speakers",
            details: err.message,
        });
    }
});

// GET /speakers/:id
router.get("/:id", async (req, res) => {
    try {
        const speaker = await Speakers.getSpeakerById(req.params.id);
        if (!speaker)
            return res.status(404).json({ error: "Speaker not found" });
        res.status(200).json(speaker);
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve speaker by ID",
            details: err.message,
        });
    }
});

// POST /speakers/
router.post("/", (req, res) => {
    res.send(Speakers.createSpeaker(req.body));
});

module.exports = router;
