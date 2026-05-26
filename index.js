const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot script running.'));
app.listen(process.env.PORT || 3000);

function createBot() {
  console.log('Attemping connection to Minecraft server...');
  
  const bot = mineflayer.createBot({
    host: 'schoolsmpseason3a1.play.hosting', // Ensure NO port is in this line (e.g. '142.44.22.10')
    port: 22404,            // Ensure this is your numerical 5-digit port
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
