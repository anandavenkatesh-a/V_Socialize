

const express = require('express');
const user_controller = require('../controllers/user_controller');

//create router
const router = express.Router();

router.get('/',user_controller);

//futher routing
router.use('/profile',require('./profile'));
module.exports = router;