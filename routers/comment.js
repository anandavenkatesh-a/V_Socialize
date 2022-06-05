

const router = require('express').Router();
const comment_controller = require('../controllers/comment_controller');
const localAuth = require('../config/passport_auth_local_strategy');
router.post('/create',comment_controller.create);
router.get('/destroy/:id',localAuth.checkAuthentication,comment_controller.destroy);
module.exports = router;