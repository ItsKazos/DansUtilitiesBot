const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.NzY0NjI0NTM5NDU5MjU2MzIw.X4I-GA.DnutxvdPMpIL-lNdNkPYzfZXFrA);