

const router = require('express').Router();

const post_api = require('../../../controllers/api/v1/post');
router.get('/',post_api.index);
router.delete('/:id',post_api.delete);
module.exports = router;