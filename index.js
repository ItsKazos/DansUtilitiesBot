const discord = require("discord.js");
const config = require("./config.json")
const antispam = require('better-discord-antispam');
const bot = new discord.Client({disableEveryone: true});
const { Player } = require("discord-music-player");
const player = new Player(bot);
bot.player = player;

bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready for action!`);
    bot.user.setActivity('you', { type: 'WATCHING' });
    antispam(bot, {
        limitUntilWarn: 5,
        limitUntilMuted: 10,
        interval: 2000, 
        warningMessage: "please do not spam or you will be muted.",
        muteMessage: "you have been muted for 1 hour for spamming.",
        maxDuplicatesWarning: 3,
        maxDuplicatesMute: 5,
        ignoredRoles: ["• Moderation Staff"],
        ignoredMembers: ["Clyde#0000"],
        mutedRole: "Muted",
        timeMuted: 1000 * 3600,
        logChannel: "automod-logs"
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    bot.emit('checkMessage', message);
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}test`) {
        message.channel.send({embed: {
            title: "This is an embed",
            color: 3447003,
            description: "a very simple embed!"
        }});
    }

    if (cmd === `${prefix}slowmode`) {
        const { member, mentions } = message
        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            let slowmode = args.slice(0).join(" ")
            if(!slowmode)return message.channel.send(`Please put a number in the command`)
            if(isNaN(slowmode))return message.channel.send(`That is not a number!`)
            message.channel.setRateLimitPerUser(slowmode)
            message.channel.send(`Slowmode set to ${slowmode}`)
        }
    }
    if (cmd === `${prefix}kick`) {
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            const reason = args.slice(1).join(" ")
            if (user) {
                if(!args.slice(1).join(" ")) return message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    description: `Please do ${prefix}kick (mention player or ID) (reason)`
                }});
                const targetMember = message.guild.members.cache.get(user.id)
                user.user.send({embed: {
                    description: `You have been kicked from the server.`
                }}).catch(() => message.channel.send({embed: {
                    description: `<@${user.id}> has their DM's disabled. Could not send a punishment alert.`
                }}))
                setTimeout(function() {
                    targetMember.kick(`${reason}`)
                    message.channel.send({embed: {
                        description: `<@${user.id}> has been successfully kicked from the server.`
                    }});
                }, 100);
            } else{
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    description: `Please do ${prefix}kick (mention player or ID) (reason)`
                }});
            }
        } else{
            message.channel.send({embed: {
                title: `Permission error`,
                description: `<@${member.id}>, you do not have permission to preform ${prefix}kick. If this is in error, please contact <@325090475839324161> (The bot developer).`
            }});
        }
    }
});

bot.login (config.token);