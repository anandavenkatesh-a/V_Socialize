

const express = require('express');
const router = express.Router();
const post_handler = require('../controllers/post_handler');
const passport = require('passport');
router.post('/create',passport.checkAuthentication,post_handler.create);
router.get('/destroy/:id',passport.checkAuthentication,post_handler.delete);
module.exports = router;