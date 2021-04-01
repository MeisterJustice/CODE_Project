const express = require("express");
const router = express.Router({ mergeParams: true });

const { createSchedule, getSchedule } = require("../controllers/schedule");

// @Route            >   POST  /api/v1/schedule
// @Description      >   Create Schedule
// @Access Control   >   Public
router.post("/", createSchedule);

// @Route            >   GET  /api/v1/schedule
// @Description      >   Fetch Schedules
// @Access Control   >   Public
router.get("/", getSchedule);

module.exports = router;
