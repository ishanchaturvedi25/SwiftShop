const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to SwiftShop API!');
});

module.exports = app;