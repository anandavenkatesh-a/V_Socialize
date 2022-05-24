

const express = require('express');
const home_controller = require('../controllers/home_controller');

//create a router
const router = express.Router();

router.get('/',home_controller.home);

//further routing
router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
module.exports = router;