import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/project.routes.js';
import userRouter from './routes/user.route.js'
import errorHandler from './middlewares/errorHandler.js';
import connectDB from './config/db.js'

const app = express();

connectDB();

const appInfo = {
  nombre: "Mi Aplicación",
  author: "Autor",
  descripcion: "hola mundo",
  version: "1.0.0"
}

app.use(cors({
  origin: ['', ''],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization",  "x-access-token"],
  credentials: true 
}));

app.use(express.json({ limit: '500mb' }))
app.use('/api/user', userRouter);
app.use('/api/projects', projectRoutes);
// app.use('/api/auth', authRouter );
// app.use('/api/files', filesRouter);
// app.use('/api/roles', rolesRouter);
// app.use('/api/task', taskRouter);
// app.use('/api/categories', categoriasRouter);
// app.use('/api/subTask', subTaskRouter);
// app.use('/api/forgot', forgotRouter);


app.use(errorHandler);

app.get("/", (req, res) => {
  res.send(`
    <h1>  Bienvenidos </h1>
    <p> <strong> Name: </strong> ${appInfo.nombre} </p>
    <p> <strong> Author: </strong> ${appInfo.author} </p>
    <p> <strong> Descripcion: </strong> ${appInfo.descripcion} </p>
    <p> <strong> Version: </strong> ${appInfo.version} </p>
    `);
})


export default app;
