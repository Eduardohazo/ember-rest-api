import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

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
app.get('/', (req, res) => {
  res.json('Recieved a GET request with success!');
});

app.post('/products', (req, res) => {
  console.log(req.body);
  res.json('Recieved a POST request with success!');
});

app.listen(PORT, () => {
  console.log(`Ember REST API listening on port ${PORT}`)
});