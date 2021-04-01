const express = require("express");
const router = express.Router({ mergeParams: true });

const { createPhoto } = require("../controllers/photo");

const { isAuthenticated, isAuthorized } = require("../middleware");

// @Route            >   POST  /api/v1/photo
// @Description      >   Upload Photo
// @Access Control   >   Private
router.post("/", createPhoto, isAuthenticated, isAuthorized);

module.exports = router;
