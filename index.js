const net = require('net');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Status Ping Active.'));
app.listen(process.env.PORT || 3000);

// YOUR SPECIFIC PLAY HOSTING SERVER DETAILS
const SERVER_IP = 'schoolsmpseason3a1.play.hosting'; 
const SERVER_PORT = 63191;          

function sendStatusPing() {
  console.log(`Sending Server List status request to ${SERVER_IP}:${SERVER_PORT}...`);
  const client = new net.Socket();
  
  // Set a timeout so Render doesn't get stuck if the server is off
  client.setTimeout(5000); 

  client.connect(SERVER_PORT, SERVER_IP, () => {
    // Send a standard Legacy Server List Ping packet (Triggers an external MOTD update)
    client.write(Buffer.from([0xFE, 0x01])); 
  });

  client.on('data', (data) => {
    console.log('SUCCESS: Server status packet accepted by Play Hosting proxy.');
    client.destroy();
  });

  client.on('error', (err) => {
    console.error('Ping dropped by host network firewall:', err.message);
    client.destroy();
  });

  client.on('timeout', () => {
    console.warn('Connection timed out. Server might be hibernating.');
    client.destroy();
  });
}

// Pings your server every 3 minutes to reset the host's countdown timer
setInterval(sendStatusPing, 180000);
sendStatusPing();
