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

    if (cmd === `${prefix}ping`) {
        const { member, mentions } = message
        if (member.hasPermission("ADMINISTRATOR")) {
            message.channel.send({embed: {
                title: `Bot latency/ping`,
                description: `Latency is ${Date.now() - message.createdTimestamp}ms
API Latency is ${Math.round(bot.ws.ping)}ms.`
            }})
        }
    }
    if(cmd === `${prefix}lock`) {
        const { member, mentions } = message
        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            if (args.slice(0).join(" ") == `channel`) {
                message.channel.updateOverwrite('762104108261572610', {
                    SEND_MESSAGES: false
                });
                message.channel.send(`The channel has been locked to all members. Type ${prefix}unlock channel to unlock this channel`)
            } else {
                if (args.slice(0).join(" ") == `all`) {
                    const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
                    channels.forEach(channel => {
                        channel.updateOverwrite('762104108261572610', {
                            SEND_MESSAGES: false
                        });
                        channel.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    })
                    message.channel.send(`All channels have been locked to all members. Type ${prefix}unlock all to unlock all channels`)
                } else {
                    message.channel.send(`Please type ${prefix}lock [all | channel]`)
                }
            }
            
        }

    }
    if(cmd === `${prefix}unlock`) {
        const { member, mentions } = message
        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            if (args.slice(0).join(" ") == `channel`) {
                message.channel.updateOverwrite('762104108261572610', {
                    SEND_MESSAGES: null
                });
                message.channel.send(`The channel has been unlocked to all members.`)
            } else {
                if (args.slice(0).join(" ") == `all`) {
                    general = bot.channels.cache.get("762115463911833641");
                    generaloverflow = bot.channels.cache.get("762115504466296852");
                    media = bot.channels.cache.get("762115512200331314");
                    gaming = bot.channels.cache.get("762115542269820949");
                    questions = bot.channels.cache.get("762115595063132202");
                    otherlanguages = bot.channels.cache.get("762443522397306920");
                    botcommands = bot.channels.cache.get("762154748530130984");
                    appealmute = bot.channels.cache.get("762163187302137866");
                    dankmemer = bot.channels.cache.get("770747807068848138");
                    dankmemer2 = bot.channels.cache.get("771426330444693534");
                    selfadvertising = bot.channels.cache.get("762116284342206464");
                    voicetext = bot.channels.cache.get("762520920685805588");
                    general.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    generaloverflow.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    media.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    gaming.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    questions.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    otherlanguages.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    botcommands.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    appealmute.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    dankmemer.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    dankmemer2.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    selfadvertising.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    voicetext.updateOverwrite('762104108261572610', {
                        SEND_MESSAGES: null
                    });
                    message.channel.send(`All channels have been unlocked to all members.`)
                } else {
                    message.channel.send(`Please type ${prefix}unlock [all | channel]`)
                }
            }
            
        }

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