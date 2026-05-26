const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Web server layer required by Render's platform
app.get('/', (req, res) => res.send('Bot is active.'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'YOUR_SERVER_IP', 
    port: 25565,           
    username: 'AFK_Bot_Cloud',    
    version: '1.20.1'       
  });

  bot.on('spawn', () => {
    console.log('Bot logged into Minecraft server.');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => setTimeout(createBot, 5000));
}
createBot();
