const express = require("express");
const router = express.Router();

const {
  createSport,
  getSports,
  updateSport
} = require("../controllers/sportController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

router.get("/", protect, getSports);

router.post("/", protect, adminOnly, createSport);

router.put("/:id", protect, adminOnly, updateSport);

module.exports = router;