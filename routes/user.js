const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middlewares/auth');

// Rutas de autenticación
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Ruta de prueba
router.get('/prueba-user', auth.auth, UserController.pruebaUser);

module.exports = router;
