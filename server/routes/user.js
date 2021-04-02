const express = require("express");
const router = express.Router({ mergeParams: true });

const { signin, signup, updateUser, getUser } = require("../controllers/user");

const { isAuthenticated, isAuthorized } = require("../middleware");

// @Route            >   POST  /api/v1/user/signup
// @Description      >   Signup
// @Access Control   >   Public
router.post("/signup", signup);

// @Route            >   POST  /api/v1/user/signin
// @Description      >   Signin
// @Access Control   >   Public
router.post("/signin", signin);

// @Route            >   GET  /api/v1/user/view
// @Description      >   View Users
// @Access Control   >   Private
router.post("/view", getUser, isAuthenticated, isAuthorized);

// @Route            >   PUT  /api/v1/user/view
// @Description      >   Update User
// @Access Control   >   Public
router.put("/view", updateUser, isAuthenticated, isAuthorized);

module.exports = router;
