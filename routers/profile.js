

const express = require('express');
const router = express.Router();
const profile_controller = require('../controllers/profile_controller');
router.get('/',profile_controller);
module.exports = router;
