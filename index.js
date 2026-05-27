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
const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot script running.'));
app.listen(process.env.PORT || 3000);

function createBot() {
  console.log('Attemping connection to Minecraft server...');
  
  const bot = mineflayer.createBot({
    host: 'schoolsmpseason3a1.play.hosting', // Ensure NO port is in this line (e.g. '142.44.22.10')
    port: 63191,            // Ensure this is your numerical 5-digit port
    username: 'tgstuntwa',    
    version: '1.21.1'       // Verify your exact base Minecraft version
  });

  bot.on('inject_allowed', () => {
    console.log('Connected to target IP! Authenticating protocol...');
  });

  bot.on('spawn', () => {
    console.log('SUCCESS: Bot has spawned into the world!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  // CRITICAL DEBUG LOGGING
  bot.on('error', (err) => {
    console.error('!!! MINECRAFT CONNECTION ERROR !!!', err.message);
  });

  bot.on('end', (reason) => {
    console.warn(`Connection closed. Reason: ${reason}. Retrying in 10s...`);
    setTimeout(createBot, 10000);
  });
}

createBot();
