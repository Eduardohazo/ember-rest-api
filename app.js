import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './routes/productRoute.js';
import authRouter from './routes/authRoute.js';


// Server
const app = express();

// Middelwares
app.use(cors());
app.use(express.json());

// Env
dotenv.config();

// Port
const PORT = process.env.PORT || 3000;

// Routs
app.use('/api/user', authRouter);
app.use('/api/product', productRouter);

app.listen(PORT, () => {
  console.log(`Ember REST API listening on port ${PORT}`)
});