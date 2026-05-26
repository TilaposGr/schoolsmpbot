const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Web server layer required by Render's platform
app.get('/', (req, res) => res.send('Bot is active.'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: '127.0.0.1:19836', 
    port: 19836,           
    username: 'the guy she tells you not to worry about',    
    version: '1.21.1'       
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
