const net = require('net');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Status Ping Active.'));
app.listen(process.env.PORT || 3000);

const SERVER_IP = 'YOUR_SERVER_IP'; // Your numeric play.hosting IP
const SERVER_PORT = 19836;          // Your 5-digit port

function sendStatusPing() {
  console.log('Sending Server List status request...');
  const client = new net.Socket();
  
  client.connect(SERVER_PORT, SERVER_IP, () => {
    // Send a standard Minecraft Server List Ping packet (Legacy SLP)
    client.write(Buffer.from([0xFE, 0x01])); 
  });

  client.on('data', (data) => {
    console.log('SUCCESS: Server status received. Host packet updated.');
    client.destroy();
  });

  client.on('error', (err) => {
    console.error('Ping error:', err.message);
    client.destroy();
  });
}

// Ping every 3 minutes
setInterval(sendStatusPing, 180000);
sendStatusPing();
