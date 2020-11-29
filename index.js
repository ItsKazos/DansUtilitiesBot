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
    "your messages", 
    "with my dog",
    "giveaways", 
    "Minecraft",
    ":D"
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
        if (activities_list[index] === `your messages` || activities_list[index] === `giveaways` || activities_list === ``) {
            bot.user.setActivity(activities_list[index], { type: "WATCHING"});
        } else {
            bot.user.setActivity(activities_list[index]);
        }
    }, 10000); // Runs this every 10 seconds.
    antispam(bot, {
        limitUntilWarn: 3,
        limitUntilMuted: 5,
        interval: 2000,
        warningMessage: "please do not spam or you will be muted.",
        muteMessage: "you have been muted for 1 hour for spamming.",
        maxDuplicatesWarning: 5,
        maxDuplicatesMute: 10,
        ignoredRoles: ["🚨┃Trainee Moderator", "🚨┃Moderator", "🤖┃Bot Developer", "🚨┃Head Moderator", "👮‍♂️┃Administrator", "*", "👮‍♂️┃Head Administrator", "👑┃Co Owner", "👑┃Owner"],
        ignoredMembers: ["Clyde#0000"],
        mutedRole: "Muted",
        timeMuted: 1000 * 3600,
        logChannel: "automod-logs"
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") {
        const { member, mentions } = message
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        let embedSyntax = new discord.MessageEmbed()
        .setTitle("**Modmail Menu**")
        .setDescription(`Modmail menu for Dan's Hangout

appeal - Appeal a punishment (appeal <type> <message>, e.g. appeal ban I'm sorry for what I did. I'll never do it again...)
report user - Report a user (report user <member ID> <reason>, e.g. report user 325090475839324161 noob)
report staff - Report a staff (report staff <staff ID> <reason>, e.g. report user 325090475839324161 False Banning)
request role - Request a role (request role <role name without spaces> <reason>), e.g. request role artist posting enough personal art)`)
        if(cmd === `appeal`) {
            if(args[0] === `ban`) {
                if(!args[1]) return message.channel.send("Actually type an appeal. Smh.")
                message.channel.send("Appeal successfully sent!")
                appeal = bot.channels.cache.get("779776077115162654");
                appeal.send(`**Ban appeal from:** <@${message.author.id}>
**Appeal:**` + ' ``' + args.slice(1).join(" ") + '``')
            } else {
                if (args[0] === `mute`) {
                    if(!args[1]) return message.channel.send("Actually type an appeal. Smh.")
                    message.channel.send("Appeal successfully sent!")
                    appeal = bot.channels.cache.get("779776077115162654");
                    appeal.send(`**Mute appeal from:** <@${message.author.id}>
**Appeal:**` + ' ``' + args.slice(1).join(" ") + '``')
                } else {
                    if(args[0] === `kick`) {
                        if(!args[1]) return message.channel.send("Actually type an appeal. Smh.")
                        message.channel.send("Appeal successfully sent!")
                        appeal = bot.channels.cache.get("779776077115162654");
                        appeal.send(`**Kick appeal from:** <@${message.author.id}>
**Appeal:**` + ' ``' + args.slice(1).join(" ") + '``')
                    } else {
                        if(args[0] === `warn`) {
                            if(!args[1]) return message.channel.send("Actually type an appeal. Smh.")
                            appeal = bot.channels.cache.get("779776077115162654");
                            appeal.send(`**Warn appeal from:** <@${message.author.id}>
**Appeal:**` + ' ``' + args.slice(1).join(" ") + '``')
                            message.channel.send("Appeal successfully sent!")
                        } else {
                            message.channel.send(args[0] + " is not a real punishment. Please try ban, mute, kick or warn.")
                        }
                    }
                }
            }
        } else {
            if(cmd === `report`) { 
                if (args[0] === `user`) {
                    let user = args[1]
                    if(!user) return message.channel.send("Actually mention a player. Smh.")
                    if(!args[2]) return message.channel.send("Actually type a report. Smh.")
                    report = bot.channels.cache.get("779776276780023859");
                    report.send(`**User report from:** <@${message.author.id}>
**Member:** ${user}
**Report:**` + ' ``' + args.slice(2).join(" ") + '``')
                    message.channel.send("Report successfully sent!")

                } else {
                    if (args[0] === `staff`) {
                        let user = args[1]
                        if(!user) return message.channel.send("Actually mention a staff. Smh.")
                        if(!args[2]) return message.channel.send("Actually type a report. Smh.")
                        report = bot.channels.cache.get("779776146048811028");
                        report.send(`**User report from:** <@${message.author.id}>
**Member:** ${user}
**Report:**` + ' ``' + args.slice(2).join(" ") + '``')
                        message.channel.send("Report successfully sent!")
                    } else {
                        message.channel.send(embedSyntax)
                    }
                }
            } else {
                if (cmd === `request`) {
                    if (args[0] === `role`) {
                        if(!args[2]) return message.channel.send("Actually type a reason. Smh.")
                        report = bot.channels.cache.get("779776221302620180");
                        report.send(`**User report from:** <@${message.author.id}>
**Role:** ${args[1]}
**Report:**` + ' ``' + args.slice(2).join(" ") + '``')
                        message.channel.send("Role request successfully sent!")
                    } else {
                        message.channel.send(embedSyntax)
                    }
                } else {
                    message.channel.send(embedSyntax)
                }
            }
        }
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
                            message.channel.send("You have been auto-muted for 1 day for swearing multiple times")
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
                setTimeout(function() {
                    con.query(`SELECT * FROM swearcount WHERE id = '${message.author.id}'`, (err,rows) => {
                        sql = `UPDATE swearcount SET swearcount = '0' WHERE id = '${message.author.id}'`
                        con.query(sql, console.log())
                    })
                }, 3600000)
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
                            message.channel.send("You have been auto-muted for 1 day for pinging owners multiple times")
                            let role = message.guild.roles.cache.find(r => r.name === "Muted");
                            let user = message.guild.members.cache.get(message.author.id)
                            user.roles.add(role)
                            sql = `UPDATE pingowners SET pingowners = '0' WHERE id = '${message.author.id}'`
                            setTimeout(function() {
                                user.roles.remove(role)
                            }, 3600000);
                        } else {
                            message.channel.send(`You aren't allowed to tag owners.`);
                        }
                    }
                    con.query(sql, console.log())
                })
                setTimeout(function() {
                    con.query(`SELECT * FROM pingowners WHERE id = '${message.author.id}'`, (err,rows) => {
                        sql = `UPDATE pingowners SET pingowners = '0' WHERE id = '${message.author.id}'`
                        con.query(sql, console.log())
                    })
                }, 3600000)
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
        if(cmd === `${prefix}verify`) {
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