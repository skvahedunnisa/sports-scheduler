const express = require("express");
const router = express.Router();

const {
  createSession,
  getSessions,
  joinSession,
  getMySessions,
  getJoinedSessions,
  cancelSession
} = require("../controllers/sessionController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getSessions);

router.post("/", protect, createSession);

router.post("/:id/join", protect, joinSession);

router.get("/my", protect, getMySessions);
router.get("/joined", protect, getJoinedSessions);
router.put("/:id/cancel", protect, cancelSession);

module.exports = router;