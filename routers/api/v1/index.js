

const router = require('express').Router();

router.use('/posts',require('./post'));
router.use('/users',require('./users'));
module.exports = router;