const router = require('express').Router();
const PublicationController = require('../controllers/publication');
router.get('/prueba-publication', PublicationController.pruebaPublication);
module.exports = router;
