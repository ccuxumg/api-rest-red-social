const router = require('express').Router();
const UserController = require('../controllers/user');   // 👈 corregido
router.get('/prueba-user', UserController.pruebaUser);
module.exports = router;

