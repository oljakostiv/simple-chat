const cors = require('cors');
const express = require('express');
const events = require('events');

const PORT = 5001;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/connect', (req, res) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  emitter.on('newMessage', (message) => { //вже безліч разів;
    res.write(`data: ${JSON.stringify(message)} \n\n`); //як строка, по спец шаблону;
  });
});

app.post('/new-message', (req, res) => {
  const message = req.body;
  emitter.emit('newMessage', message);

  res.status(200);
});

app.listen(PORT, () => {
  console.log(`Welcome! Port: ${PORT}`);
});
