

const router = require('express').Router();

router.use('/posts',require('./post'));
router.use('/users',require('./users'));
router.use('/likes',require('./likes'));
module.exports = router;