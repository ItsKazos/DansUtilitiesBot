const { Client, Collection } = require("discord.js");
const discord = require("discord.js");
const config = require("./config.json")
const antispam = require('better-discord-antispam');
const bot = new Client({disableEveryone: true});
const { Player } = require("discord-music-player");
const player = new Player(bot);
const ms = require('ms')
const minigames = require('discord-minigames')
const fs = require('fs')
var mysql = require('mysql');
bot.player = player;
const { GiveawaysManager } = require("discord-giveaways")
const Twitter = require('twit');
const activities_list = [
    "with the &help command.", 
    "with the developers console",
    "with some code", 
    "with JavaScript"
    ];

var con = mysql.createConnection({
    host: "na01-sql.pebblehost.com",
    user: "customer_147102_discord",
    password: "T!8jfFr$b#Xo!qn~otpb",
    database: "customer_147102_discord"
})

con.connect(err => {
    if(err) throw err;
    console.log("connected to the database!")
    con.query("SHOW TABLES", console.log);
})
const twitterConf = {
    consumer_key: 'UY7U6RTA4H7eFLtvVAF4TvJpE',
    consumer_secret: '2WuACl6Xc037FfYdZ0D4xxljYpskfSEJFpEy20FzDPZHCqNDN4',
    access_token: '1328094862877593601-2MSkFMNbyKNoWdnCB5qUn5wnC2BpE5',
    access_token_secret: 'JNWJ7cAlVm8ZTlhu2fTEdMBObj0xDu8Ufjchy9miTarMW',
}
const twitterClient = new Twitter(twitterConf);
const twitterchannel = '777655386550566963';
const stream = twitterClient.stream('statuses/filter', {
    follow: '1328094862877593601',
});

stream.on('tweet', tweet => {
    const twitterMessage = `${tweet.user.name} (@${tweet.user.screen_name}) tweeted this: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    bot.channels.cache.get(twitterchannel).send(twitterMessage);
    return false;
});

bot.commands = new Collection();
bot.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
})

bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ ],
        embedColor: "#4287f5",
        reaction: "🎉"
    }
});
bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready for action!`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
    antispam(bot, {
        limitUntilWarn: 3,
        limitUntilMuted: 5,
        interval: 2000,
        warningMessage: "please do not spam or you will be muted.",
        muteMessage: "you have been muted for 1 hour for spamming.",
        maxDuplicatesWarning: 5,
        maxDuplicatesMute: 10,
        ignoredRoles: ["Trainee Moderator", "Moderator", "Bot Developer", "Head Moderator", "Administrator", "Admin Perms", "Co Owner", "Owner"],
        ignoredMembers: ["Clyde#0000"],
        mutedRole: "Muted",
        timeMuted: 1000 * 3600,
        logChannel: "automod-logs"
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") {
        botdms = bot.channels.cache.get("775051348897955841");
        botdms.send(`**Direct Message from:** <@${message.author.id}>
**Message Content:**` + ' ``' + message.content + '``')
        message.channel.send("Your modmail was successfully sent to the moderators of this server.")
    }
    var noWords = JSON.parse(fs.readFileSync("./words/blockedWords.json"));
    var msg = message.content.toLowerCase();
    const { member, mentions } = message
    for (let i = 0; i < noWords["blockedWords"].length; i++) {
        if (msg.includes(noWords["blockedWords"] [i])) {
            if(!member.hasPermission('ADMINISTRATOR') && !member.hasPermission('KICK_MEMBERS')) {
                message.delete()
                con.query(`CREATE TABLE IF NOT EXISTS swearcount (id TEXT, swearcount TEXT)`)
                con.query(`SELECT * FROM swearcount WHERE id = '${message.author.id}'`, (err,rows) => {
                    if(err) throw err;
            
                    let sql;
                    
                    if(rows.length < 1) {
                        sql = `INSERT INTO swearcount (id, swearcount) VALUES ('${message.author.id}', '1')`
                        message.channel.send(`You aren't allowed to say that.`);
                    } else {
                        let swearcount = parseInt(rows[0].swearcount)
                        sql = `UPDATE swearcount SET swearcount = ${Math.floor(swearcount + 1)} WHERE id = '${message.author.id}'`
                        if (Math.floor(swearcount + 1) >= 2) {
                            message.channel.send("You have been auto-muted for 1 hour for swearing multiple times")
                            let role = message.guild.roles.cache.find(r => r.name === "Muted");
                            let user = message.guild.members.cache.get(message.author.id)
                            user.roles.add(role)
                            sql = `UPDATE swearcount SET swearcount = '0' WHERE id = '${message.author.id}'`
                            setTimeout(function() {
                                user.roles.remove(role)
                            }, 3600000);
                        } else {
                            message.channel.send(`You aren't allowed to say that.`);
                        }
                    }
                    con.query(sql, console.log())
                })
            }
        }
    }
    for (let i = 0; i < noWords["noTag"].length; i++) {
        if (msg.includes(noWords["noTag"] [i])) {
            if(!member.hasPermission('ADMINISTRATOR') && !member.hasPermission('KICK_MEMBERS')) {
                message.delete()
                con.query(`CREATE TABLE IF NOT EXISTS pingowners (id TEXT, pingowners TEXT)`)
                con.query(`SELECT * FROM pingowners WHERE id = '${message.author.id}'`, (err,rows) => {
                    if(err) throw err;
            
                    let sql;
                    
                    if(rows.length < 1) {
                        sql = `INSERT INTO pingowners (id, pingowners) VALUES ('${message.author.id}', '1')`
                        message.channel.send(`You aren't allowed to tag owners.`);
                    } else {
                        let pingowners = parseInt(rows[0].pingowners)
                        sql = `UPDATE pingowners SET pingowners = ${Math.floor(pingowners + 1)} WHERE id = '${message.author.id}'`
                        if (Math.floor(pingowners + 1) >= 2) {
                            message.channel.send("You have been auto-muted for 1 hour for pinging owners multiple times")
                            let role = message.guild.roles.cache.find(r => r.name === "Muted");
                            let user = message.guild.members.cache.get(message.author.id)
                            user.roles.add(role)
                            sql = `UPDATE pingowners SET pingowners = '0' WHERE id = '${message.author.id}'`
                            setTimeout(function() {
                                user.roles.remove(role)
                            }, 3600000);
                        } else {
                            message.channel.send(`You aren't allowed to tag owners. ${pingowners + 1}`);
                        }
                    }
                    con.query(sql, console.log())
                })
            }
        }
    }
    bot.emit('checkMessage', message);
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(cmd.length === 0) return;
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command)
        command.run(bot, message, args)
    


    if (message.channel.id === `774816409133645895` || message.channel.id === `762110786335277066`) {
        if(cmd === `>verify`) {
            if (args[0] === `E39h2kg3A`) {
                const { member, mentions } = message
                let role = message.guild.roles.cache.find(r => r.name === "Member");
                member.roles.add(role)
                message.delete();
            } else {
                message.delete();
            }
        } else {
            message.delete();
        }
    }

});
bot.login (config.token);