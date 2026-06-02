import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Importación de rutas
import authRoutes from './routes/authRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import readerRoutes from './routes/readerRoutes.js';
import loanRoutes from './routes/loanRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Declaración de Endpoints Globales
app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/readers', readerRoutes);
app.use('/api/loans', loanRoutes);

// Ruta base (Healthcheck)
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API de Biblioteca Digital corriendo perfectamente.' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});