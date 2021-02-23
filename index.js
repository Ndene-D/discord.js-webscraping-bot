const scrape =  require('./web-scraper/web-scraper.js');
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const prefix = '!';


bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');

  } else if (msg.content.startsWith(`${prefix}kick`)) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }else if (msg.content === `${prefix}server`){
    msg.channel.send(`This server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
  }else if(msg.content === `${prefix}user`){
    msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
  }else if(msg.content.startsWith(`${prefix}ref`)){
    async function Reference(){
      let nMsg = msg.content.substring(5, msg.content.length);
      const url = new scrape();
      const ref = url.ref(nMsg);
      let info = await url.response();
      url.format(info);

      return msg.channel.send(`Here's the info on the C++ reference you requested:\n${info}`);
    }
    
    Reference();
    // let test = "hi";
    
  }
});
