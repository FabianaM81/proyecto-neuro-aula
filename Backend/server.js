require("dotenv").config(); 

if (!process.env.JWT_SECRET) {
  console.error('🚨 ERROR CRÍTICO: JWT_SECRET no definida en .env');
  throw new Error('JWT_SECRET no definida en .env');
}

const express = require("express");          
const cors = require("cors");
const chalk = require("chalk");
const userRoutes = require('./routes/usuarios');
const recuperacionRoutes = require('./routes/recuperacion');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${chalk.cyan('➡️')} ${req.method} ${req.path}`);
  next();
});

app.use('/api/usuarios', userRoutes);
app.use('/api/recuperacion', recuperacionRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API NeuroAula funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.path 
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(chalk.blue.bold(`\n🚀 Servidor NeuroAula corriendo en http://127.0.0.1:${PORT}`));
  console.log(chalk.green.bold("✅ Listo para recibir peticiones\n"));
});