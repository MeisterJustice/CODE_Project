const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getUsers
} = require('../controllers/user');

const {isAuthenticated, isAuthorized} = require("../middleware")


// @Route            >   POST  /api/v1/user
// @Description      >   View All Users
// @Access Control   >   Public
router.post('/',
    isAuthenticated,
    getUsers
);

module.exports = router;