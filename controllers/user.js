const pruebaUser = (req, res) => {
  return res.status(200).json({ message: 'Mensaje de prueba desde el controlador de user' });
};

module.exports = { pruebaUser };

