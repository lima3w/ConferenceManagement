const express = require("express");
const router = express.Router();

const Rooms = require("../functions/rooms");

// GET /rooms/
router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Rooms.getRooms());
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve rooms",
            details: err.message,
        });
    }
});

// GET /rooms/:id
router.get("/:id", async (req, res) => {
    try {
        const room = await Rooms.getRoomById(req.params.id);
        if (!room) return res.status(404).json({ error: "Room not found" });
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve room by ID",
            details: err.message,
        });
    }
});

// POST /rooms/
router.post("/", (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        console.log(req.body);
        return res
            .status(400)
            .json({ error: "Request body is missing or empty" });
    }

    res.send(Rooms.createRoom(req.body));
});

module.exports = router;
