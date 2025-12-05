import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './routes/productRoute.js';


// Server
const app = express();

// Middelwares
app.use(cors());
app.use(express.json());

// Env
dotenv.config();

// Port
const PORT = process.env.PORT || 3000;

// End Points
app.use('/api/user', (req, res) => {
  res.json('Recieved a GET request with success to /api/user route!');
});

app.use('/api/product', productRouter);

app.listen(PORT, () => {
  console.log(`Ember REST API listening on port ${PORT}`)
});