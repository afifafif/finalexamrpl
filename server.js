const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

// Middleware untuk menangani CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Rute untuk menangani permintaan ke API cuaca
app.get('/weather', async (req, res) => {
  try {
    const response = await fetch('https://mgm.ub.ac.id/weather.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Rute untuk melayani file statis (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server proxy running at http://localhost:${port}`);
});
