

const express = require('express');
const user_controller = require('../controllers/user_controller');
const passport = require('passport');
const localAuth = require('../config/passport_auth_local_strategy');
//create router
const router = express.Router();

router.get('/profile',localAuth.checkAuthentication,user_controller.profile);

router.get('/sign-in',localAuth.notAuth,user_controller.sign_in);

router.get('/sign-up',localAuth.notAuth,user_controller.sign_up);

router.post('/create-account',user_controller.create_account);

router.post('/create-session',passport.authenticate('local',{failureRedirect:"/user/sign-in"}),user_controller.create_session);

router.get('/destroy-session',user_controller.destroySession);

router.post('/update_profile',localAuth.checkAuthentication,user_controller.update_profile);
module.exports = router;