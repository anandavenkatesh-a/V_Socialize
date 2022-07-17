

const router = require('express').Router();
const likesController = require('../../../controllers/api/v1/likes_controller');
const passport = require('passport');
router.get('/toggle',passport.checkAuthentication,likesController.toogleLike);
module.exports = router;