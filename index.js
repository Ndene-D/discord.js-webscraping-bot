const library = require('./web-scraper/web-scraper.js');
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const prefix = '!';
let bugs = [];
let count = 0;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === `${prefix}server`) {
    msg.channel.send(`This server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
  } else if (msg.content === `${prefix}user`) {
    msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
  } else if (msg.content.startsWith(`${prefix}lib`)) {
    if (msg.content.length > 4) {
      msg.reply("searching...");
      async function Reference() {
        let nMsg = msg.content.substring(5, msg.content.length);
        const url = new library();
        const ref = url.ref(nMsg);
        let info = await url.response();
        if (info === "error") {
          return await msg.channel.send(`Sorry ${nMsg} doesn't exist, please try again!`)
        } else {
          let fortattedInfo = await url.format(info);
          return await msg.channel.send(`Here's the functions provided in the C++ library you requested:\n${fortattedInfo} \n You can select the function number to get more info on it. \n (Must be after you call the library or it doesn't work!)`);
        }
      }
      Reference();
    }else{
      return msg.channel.send("Please enter the library you would like to retrieve.\n \t Ex: !lib 'library'");
    }
  } else if (msg.content.startsWith(`${prefix}commands`)) {
    return msg.channel.send('Avaliable Commands(all starting with !): \n 1. lib - returns all the functions a library you specify has. \n \t Ex: !lib iomanip');
  } else if (msg.content == prefix) {
    return msg.channel.send(`The ${bot.user.tag} has joined the party. For commands do !commands. :robot:`);
  } else if (msg.content.startsWith(`${prefix}bug`)) {
    count++;
    bugs.push(`${count.toString()}. ${msg.content.substring(5, msg.content.length)}`)
    return msg.channel.send(`Thanks ${msg.author.username} for reporting this bug I'll make sure to contact my maker.`);
  } else if (msg.content.startsWith(`${prefix}currentbugs`)) {
    if (bugs.length == 0) {
      return msg.channel.send('Their are currently no bugs! :grinning:')
    } else {
      return msg.channel.send(bugs);
    }

  }
});
