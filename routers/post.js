

const express = require('express');
const router = express.Router();
const post_handler = require('../controllers/post_handler');
router.post('/create',post_handler.create);
module.exports = router;