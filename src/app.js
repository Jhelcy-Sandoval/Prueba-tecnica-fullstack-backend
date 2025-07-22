import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import projectRoutes from './routes/project.routes.js ';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

import errorHandler from './middlewares/errorHandler.js';

dotenv.config(); // Carga las variables de entorno

const app = express();

// Conexión a base de datos
connectDB();

// Información básica de la app
const appInfo = {
  nombre: "Mi Aplicación",
  author: "Autor",
  descripcion: "hola mundo",
  version: "1.0.0"
};

// CORS configurado correctamente
app.use(cors({
  origin: ['https://prueba-desarrollo-fullstack.netlify.app'], 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  credentials: true
}));

// Middleware para recibir JSON
app.use(express.json());

// Rutas API
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Ruta raíz
app.get("/", (req, res) => {
  res.send(`
    <h1>Bienvenidos</h1>
    <p><strong>Nombre:</strong> ${appInfo.nombre}</p>
    <p><strong>Autor:</strong> ${appInfo.author}</p>
    <p><strong>Descripción:</strong> ${appInfo.descripcion}</p>
    <p><strong>Versión:</strong> ${appInfo.version}</p>
  `);
});

export default app;
