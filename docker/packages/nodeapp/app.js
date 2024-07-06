import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Dockerized Node.js Web App</h1>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})