require('dotenv').config({
    path: './.env.local'
});
const express = require('express');
const seedController = require('./src/controllers/seed.controller');
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use('/api/v1', seedController);

// Health check endpoint
app.get('/health', (req, res) => {
    res.send('OK');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});