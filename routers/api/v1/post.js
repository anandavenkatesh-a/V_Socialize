

const router = require('express').Router();
const passport = require('passport');
const post_api = require('../../../controllers/api/v1/post');
router.get('/',post_api.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),post_api.delete);
module.exports = router;