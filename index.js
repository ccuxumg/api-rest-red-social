require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connection');

(async () => {
  await connectDB(); // Conéctate a MongoDB antes de levantar el server

  const app = express();
  const PORT = process.env.PORT || 3900;

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  console.log('Bienvenido a mi API REST de red social arrancada');

  // Rutas (ojo: los nombres deben coincidir con tus archivos en /routes)
  app.use('/api', require('./routes/user'));         // GET /api/prueba-user
  app.use('/api', require('./routes/follow'));       // GET /api/prueba-follow
  app.use('/api', require('./routes/publication'));  // GET /api/prueba-publication

  // Ruta simple
  app.get('/ruta-de-prueba', (_req, res) =>
    res.status(200).json({ id: 1, nombre: 'Carmicuxum', web: 'carmicuxum.com' })
  );

  app.listen(PORT, () => console.log('Servidor corriendo en el puerto ' + PORT));
})();


