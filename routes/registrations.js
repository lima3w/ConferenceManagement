const express = require("express");
const router = express.Router();

const Registrations = require("../functions/registrations");

// GET /registrations/
router.get("/", async (req, res) => {
    try {
        res.status(200).json(await Registrations.getRegistrations());
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve registrations",
            details: err.message,
        });
    }
});

// GET /registrations/:id
router.get("/:id", async (req, res) => {
    try {
        const registration = await Registrations.getRegistrationById(
            req.params.id
        );
        if (!registration)
            return res.status(404).json({ error: "Registration not found" });
        res.status(200).json(registration);
    } catch (err) {
        res.status(500).json({
            error: "Failed to retrieve registration by ID",
            details: err.message,
        });
    }
});

// POST /registrations/
router.post("/", (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        console.log(req.body);
        return res
            .status(400)
            .json({ error: "Request body is missing or empty" });
    }

    res.send(Registrations.createRegistration(req.body));
});

module.exports = router;
