# API REST Red Social

Una API REST completa para una red social desarrollada con Node.js, Express y MongoDB.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Autenticación](#autenticación)
- [Variables de Entorno](#variables-de-entorno)
- [Base de Datos](#base-de-datos)
- [Endpoints API](#endpoints-api)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Scripts Disponibles](#scripts-disponibles)

## Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- MongoDB (versión 7.0 o superior)
- npm (incluido con Node.js)

## Configuración del Proyecto

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd api-rest-red-social
```

2. Instalar dependencias:
```bash
npm install
```

## Estructura del Proyecto

```
api-rest-red-social/
├── controllers/        # Controladores de la aplicación
│   └── user.js        # Controlador de usuarios y autenticación
├── middlewares/       # Middlewares
│   └── auth.js        # Middleware de autenticación
├── models/           # Modelos de la base de datos
│   └── user.js       # Modelo de usuario
├── routes/           # Rutas de la API
│   └── user.js       # Rutas de usuario y autenticación
├── services/         # Servicios
│   └── jwt.js        # Servicio para manejo de JWT
└── index.js          # Punto de entrada de la aplicación
```

## Autenticación

El sistema implementa autenticación basada en JWT (JSON Web Tokens) con las siguientes características:

### Modelo de Usuario

El modelo de usuario incluye los siguientes campos:
- `name`: Nombre del usuario (requerido)
- `surname`: Apellido del usuario (opcional)
- `nick`: Nombre de usuario único (requerido)
- `email`: Correo electrónico único (requerido)
- `password`: Contraseña encriptada (requerido)
- `role`: Rol del usuario (default: "role_user")
- `image`: Avatar del usuario (default: "default.png")
- `created_at`: Fecha de creación

### Endpoints de Autenticación

#### Registro de Usuario
```http
POST /api/register
Content-Type: application/json

{
    "name": "Nombre Usuario",
    "surname": "Apellido Usuario",
    "nick": "nickname",
    "email": "usuario@email.com",
    "password": "contraseña"
}
```

#### Login de Usuario
```http
POST /api/login
Content-Type: application/json

{
    "email": "usuario@email.com",
    "password": "contraseña"
}
```

### Características de Seguridad

1. **Encriptación de Contraseñas**
   - Utiliza bcrypt para el hash de contraseñas
   - Salt de 10 rondas para mayor seguridad

2. **Tokens JWT**
   - Generados al hacer login
   - Duración: 30 días
   - Contienen información del usuario (id, nombre, rol, etc.)

3. **Middleware de Autenticación**
   - Protege rutas privadas
   - Verifica validez del token
   - Verifica expiración del token
   - Inyecta datos del usuario en la request

### Ejemplo de Uso de Rutas Protegidas

Para acceder a rutas protegidas, incluir el token en el header:

```http
GET /api/ruta-protegida
Authorization: Bearer <token>
```

### Respuestas del Sistema

#### Registro Exitoso
```json
{
    "status": "success",
    "message": "Usuario registrado correctamente",
    "user": {
        // Datos del usuario registrado
    }
}
```

#### Login Exitoso
```json
{
    "status": "success",
    "message": "Login exitoso",
    "user": {
        "id": "user_id",
        "name": "Nombre",
        "email": "email@example.com",
        // Otros datos del usuario
    },
    "token": "JWT_TOKEN"
}
```

## Variables de Entorno

El proyecto utiliza las siguientes variables de entorno:

```env
MONGODB_URI=mongodb://localhost:27017/red-social  # URL de conexión a MongoDB
PORT=3900                                        # Puerto del servidor
```

## Base de Datos

### Modelos de Datos

#### Usuario (User)
```javascript
{
  name: String,          // Nombre completo del usuario
  username: String,      // Nombre de usuario único
  email: String,         // Correo electrónico único
  password: String,      // Contraseña encriptada
  avatar: String,        // URL de la imagen de perfil
  bio: String,          // Biografía o descripción
  role: String,         // Role del usuario (user/admin)
  created_at: Date      // Fecha de creación
}
```

#### Seguimiento (Follow)
```javascript
{
  follower: ObjectId,    // ID del usuario que sigue
  followed: ObjectId,    // ID del usuario seguido
  created_at: Date      // Fecha del seguimiento
}
```

#### Publicación (Publication)
```javascript
{
  user: ObjectId,        // ID del usuario que publica
  text: String,         // Contenido de la publicación
  image: String,        // URL de la imagen (opcional)
  created_at: Date,     // Fecha de publicación
  likes: [ObjectId]     // Array de IDs de usuarios que dieron like
}
```

### Configuración de MongoDB

La conexión a MongoDB se gestiona en `database/connection.js`:

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/red-social';
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB conectado:', uri);
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
};
```

## Tecnologías Utilizadas

- **Express**: Framework web para Node.js
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **bcrypt**: Encriptación de contraseñas
- **cors**: Middleware para habilitar CORS
- **dotenv**: Manejo de variables de entorno
- **jwt-simple**: Generación y verificación de tokens JWT
- **moment**: Manejo de fechas
- **multer**: Manejo de subida de archivos
- **validator**: Validación de datos

## Scripts Disponibles

```json
{
  "scripts": {
    "start": "npx nodemon index.js",   # Inicia el servidor con recarga automática
    "dev": "npx nodemon index.js",     # Alias para start
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### Dependencias Principales

```json
"dependencies": {
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "express": "^5.1.0",
  "jwt-simple": "^0.5.6",
  "moment": "^2.30.1",
  "mongoose": "^8.18.0",
  "mongoose-pagination": "^1.0.0",
  "multer": "^2.0.2",
  "validator": "^13.15.15"
}
```

### Dependencias de Desarrollo

```json
"devDependencies": {
  "nodemon": "^3.1.10"
}
```

## Endpoints API

### Documentación Detallada de Módulos

#### 1. Módulo de Usuarios (`/api/user`)

**Controlador**: `controllers/user.js`
**Rutas**: `routes/user.js`

Endpoints disponibles:
- `GET /api/prueba-user`: Endpoint de prueba
  - **Descripción**: Verifica la funcionalidad del controlador de usuarios
  - **Respuesta**: `{ message: 'Mensaje de prueba desde el controlador de user' }`
  - **Estado**: 200 OK

_Funcionalidades pendientes de implementar:_
- Registro de usuarios
- Login
- Actualización de perfil
- Subida de avatar
- Obtener perfil de usuario
- Listado de usuarios
- Eliminar cuenta

#### 2. Módulo de Seguimientos (`/api/follow`)

**Controlador**: `controllers/follow.js`
**Rutas**: `routes/follow.js`

Endpoints disponibles:
- `GET /api/prueba-follow`: Endpoint de prueba
  - **Descripción**: Verifica la funcionalidad del controlador de seguimientos
  - **Respuesta**: `{ message: 'Mensaje de prueba desde el controlador de follow' }`
  - **Estado**: 200 OK

_Funcionalidades pendientes de implementar:_
- Seguir a usuario
- Dejar de seguir
- Lista de seguidos
- Lista de seguidores
- Lista detallada de seguidos/seguidores

#### 3. Módulo de Publicaciones (`/api/publication`)

**Controlador**: `controllers/publication.js`
**Rutas**: `routes/publication.js`

Endpoints disponibles:
- `GET /api/prueba-publication`: Endpoint de prueba
  - **Descripción**: Verifica la funcionalidad del controlador de publicaciones
  - **Respuesta**: `{ message: 'Mensaje de prueba desde el controlador de publication' }`
  - **Estado**: 200 OK

_Funcionalidades pendientes de implementar:_
- Crear publicación
- Eliminar publicación
- Listar publicaciones de un usuario
- Feed de publicaciones
- Subir imágenes
- Listar imágenes de usuario

### Ruta de Prueba

```javascript
GET /ruta-de-prueba
Respuesta:
{
  "id": 1,
  "nombre": "Carmicuxum",
  "web": "carmicuxum.com"
}
```

## Middlewares Configurados

1. **CORS**: Habilitado para permitir peticiones cross-origin
2. **JSON Parser**: Procesa bodies en formato JSON
3. **URL Encoded**: Procesa datos de formularios

## Seguridad

El proyecto implementa varias capas de seguridad:

1. **Encriptación de contraseñas** usando bcrypt
2. **Autenticación JWT** usando jwt-simple
3. **Validación de datos** usando validator
4. **Manejo seguro de archivos** usando multer
