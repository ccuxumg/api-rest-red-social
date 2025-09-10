const router = require('express').Router();
const FollowController = require('../controllers/follow');  
router.get('/prueba-follow', FollowController.pruebaFollow);
module.exports = router;
