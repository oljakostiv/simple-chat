const ws = require('ws');

const wss = new ws.Server({
  port: 5002,
}, () => {
  console.log('Welcome! Port: 5002');
});

wss.on('connection', function connect(ws) {
  ws.on('message', function (message) {
    message = JSON.parse(message);

    switch (message.event) {
      case 'message':
        newsletter(message);
        break;
      case 'connection':
        newsletter(message);
        break;
    }
  });

  function newsletter(message) {
    wss.clients.forEach(client => { //по типу map;
      client.send(JSON.stringify(message));
    });
  }
});
