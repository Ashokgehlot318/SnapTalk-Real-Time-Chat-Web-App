const express = require('express');
const router = express.Router();

const contoller = require("../controllers/user.controller")

router.post('/signup', contoller.signup);

router.post('/login', contoller.login);

module.exports = router;