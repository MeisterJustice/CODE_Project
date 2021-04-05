const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("../services/multer");

const { createPhoto, getPhotos } = require("../controllers/photo");

const { isAuthenticated, isAuthorized } = require("../middleware");

// @Route            >   POST  /api/v1/photo
// @Description      >   Upload Photo
// @Access Control   >   Private
router.post("/", multer.array("photo", 1), createPhoto);

// @Route            >   GET  /api/v1/photo
// @Description      >   Fetch Photos
// @Access Control   >   Public
router.get("/", getPhotos);

module.exports = router;
