require('dotenv').config({
    path: './.env.local'
});
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
    res.send('OK');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});