const net = require('net');

const client = new net.Socket();

client.connect(5432, '127.0.0.1', function () {
    console.log('Connected to 127.0.0.1:5432');
    client.destroy();
});

client.on('error', function (err) {
    console.log('Connection failed to 127.0.0.1:5432: ' + err.message);
});

const client2 = new net.Socket();
client2.connect(5432, 'localhost', function () {
    console.log('Connected to localhost:5432');
    client2.destroy();
});

client2.on('error', function (err) {
    console.log('Connection failed to localhost:5432: ' + err.message);
});
