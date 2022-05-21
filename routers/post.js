

const express = require('express');
const router = express.Router();
const post_handler = require('../controllers/post_handler');
const passport = require('passport');
router.post('/create',passport.checkAuthentication,post_handler.create);
module.exports = router;