

const router = require('express').Router();
const passport = require('passport');
const profile_controller = require('../controllers/profile');
router.get('/:id',passport.checkAuthentication,profile_controller.showProfile);
module.exports = router;