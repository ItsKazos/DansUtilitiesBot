const discord = require("discord.js");
const config = require("./config.json")
const antispam = require('better-discord-antispam');
const bot = new discord.Client({disableEveryone: true});
const { Player } = require("discord-music-player");
const player = new Player(bot);
const ms = require('ms')
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

    if (message.channel.id === `774816409133645895`) {
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
    if (cmd === `${prefix}clear`) {
        const { member, mentions } = message
        if(
            member.hasPermission("ADMINISTRATOR") ||
            member.hasPermission("KICK_MEMBERS")
        ) {
            const amount = args.join(' ');
            if(!amount) {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do ${prefix}clear (Amount)`
                }});
            } else {
                if(!isNaN(amount)) {
                    message.channel.bulkDelete(amount)
                    message.channel.send(`Deleted ${amount}!`).then(msg => msg.delete({ timeout: 5000 })).catch();
                } else {
                    message.channel.send({embed: {
                        title: `Command syntax failed!`,
                        color: `fc0303`,
                        description: `Please do ${prefix}clear (Amount)`
                    }});
                }
            }
        }
    }
    if (cmd === `${prefix}tempmute`) {
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            let role = message.guild.roles.cache.find(r => r.name === "Muted");
            if (!role) {
                return message.channel.send("Couldn't find the muted role!");
            }
            let timestamp = args[1]
            if (!timestamp) {
                return message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do ${prefix}tempmute (Member) (Timestamp) (Reason)`
                }});
            }
            if(user) {
                if(args.slice(1).join(" ")) {
                    user.user.send(`You have been muted from ${message.guild.name}!
**Reason:** ${args.slice(2).join(" ")}
**Duration:** ${args[1]}`).catch(message.channel.send(`<@${user.id}> has their DM's disabled.`))
                    message.channel.send({embed: {
                        title: `User Temporarily Muted`,
                        color: `00ff48`,
                        description: `**User:** <@${user.id}>
**Staff:** <@${member.id}>
**Reason:** ${args.slice(2).join(" ")}
**Duration:** ${args[1]}`
                    }})
                    setTimeout(function() {
                        user.roles.add(role)
                    }, 1000);
                    setTimeout(function() {
                        user.roles.remove(role)
                    }, ms(timestamp));
                } else {
                    message.channel.send({embed: {
                        title: `Command syntax failed!`,
                        color: `fc0303`,
                        description: `Please do ${prefix}tempmute (Member) (Timestamp) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do ${prefix}tempmute (Member) (Timestamp) (Reason)`
                }});
            }
        }
    }
    if (cmd === `${prefix}tempban`) {
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            let role = message.guild.roles.cache.find(r => r.name === "Muted");
            if (!role) {
                return message.channel.send("Couldn't find the muted role!");
            }
            let timestamp = args[1]
            if (!timestamp) {
                return message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do ${prefix}tempban (Member) (Timestamp) (Reason)`
                }});
            }
            if(user) {
                if(args.slice(2).join(" ")) {
                    user.user.send(`You have been banned from ${message.guild.name}!
**Reason:** ${args.slice(2).join(" ")}
**Duration:** ${args[1]}`).catch(message.channel.send(`<@${user.id}> has their DM's disabled.`))
                    message.channel.send({embed: {
                        title: `User Temporarily Banned`,
                        color: `00ff48`,
                        description: `**User:** <@${user.id}>
**Staff:** <@${member.id}>
**Reason:** ${args.slice(1).join(" ")}
**Duration:** ${args[1]}`
                    }})
                    const targetMember = message.guild.members.cache.get(user.id)
                    setTimeout(function() {
                        targetMember.ban({reason: `${args.slice(2).join(" ")}`})
                    }, 1000);
                    setTimeout(function() {
                        message.guild.members.unban(user.id)
                    }, ms(timestamp));
                } else {
                    message.channel.send({embed: {
                        title: `Command syntax failed!`,
                        color: `fc0303`,
                        description: `Please do ${prefix}tempban (Member) (Timestamp) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do ${prefix}tempban (Member) (Timestamp) (Reason)`
                }});
            }
        }
    }
    if (cmd === `${prefix}mute`) {
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            let role = message.guild.roles.cache.find(r => r.name === "Muted");
            if (!role) {
                return message.channel.send("Couldn't find the muted role!");
            }
            if(user) {
                if(args.slice(1).join(" ")) {
                    user.user.send(`You have been muted from ${message.guild.name}!
**Reason:** ${args.slice(1).join(" ")}`).catch(message.channel.send(`<@${user.id}> has their DM's disabled.`))
                    message.channel.send({embed: {
                        title: `User Muted`,
                        color: `00ff48`,
                        description: `**User:** <@${user.id}>
**Staff:** <@${member.id}>
**Reason:** ${args.slice(1).join(" ")}`
                    }})
                    setTimeout(function() {
                        user.roles.add(role)
                    }, 1000);
                } else {
                    message.channel.send({embed: {
                        title: `Command syntax failed!`,
                        color: `fc0303`,
                        description: `Please do ${prefix}mute (Member) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do ${prefix}mute (Member) (Reason)`
                }});
            }
        }
    }
    if (cmd === `${prefix}ban`) {
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(user) {
                if(args.slice(1).join(" ")) {
                    user.user.send(`You have been banned from **${message.guild.name}** server!
**Reason:** ${args.slice(1).join(" ")}`).catch(message.channel.send(`<@${user.id}> has their DM's disabled.`))
                    const targetMember = message.guild.members.cache.get(user.id)
                    message.channel.send({embed: {
                        title: `User Banned`,
                        color: `00ff48`,
                        description: `**User:** <@${user.id}>
**Staff:** <@${member.id}>
**Reason:** ${args.slice(1).join(" ")}`
                    }})
                    setTimeout(function() {
                        targetMember.ban({reason: `${args.slice(1).join(" ")}`})
                    }, 1000);
                } else {
                    message.channel.send({embed: {
                        title: `Command syntax failed!`,
                        color: `fc0303`,
                        description: `Please do ${prefix}ban (Member) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do ${prefix}ban (Member) (Reason)`
                }});
            }
        }
    }
    if (cmd === `${prefix}warn`) {
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(user) {
                if(args.slice(1).join(" ")) {
                    user.user.send(`You have been warned from **${message.guild.name}** server!
**Reason:** ${args.slice(1).join(" ")}`).catch(message.channel.send(`<@${user.id}> has their DM's disabled.`))
                    const targetMember = message.guild.members.cache.get(user.id)
                    message.channel.send({embed: {
                        title: `User Warned`,
                        color: `00ff48`,
                        description: `**User:** <@${user.id}>
**Staff:** <@${member.id}>
**Reason:** ${args.slice(1).join(" ")}`
                    }})
                } else {
                    message.channel.send({embed: {
                        title: `Command syntax failed!`,
                        color: `fc0303`,
                        description: `Please do ${prefix}warn (Member) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do ${prefix}warn (Member) (Reason)`
                }});
            }
        }
    }
    if(cmd === `${prefix}lock`) {
        const { member, mentions } = message
        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            if (args[0] == `channel`) {
                message.channel.updateOverwrite('762104108261572610', {
                    SEND_MESSAGES: false
                });
                message.channel.send({embed: {
                    title: `Channel Locked`,
                    description: `The channel was locked by a staff member. **You are not muted.**
More information will be sent in this channel.
Reason: ${args.slice(1).join(" ")}`,
                    footer: {
                        text: `Locked by ${message.author.tag}`
                    }
                }})
                message.delete();
            } else {
                if (args[0] == `all`) {
                    const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
                    channels.forEach(channel => {
                        channel.updateOverwrite('762104108261572610', {
                            SEND_MESSAGES: false
                        });
                    })
                    if(message.guild.id == `774806096019324938`) {
                        general = bot.channels.cache.get("774806096623304736");
                        generaloverflow = bot.channels.cache.get("774806096623304737");
                        media = bot.channels.cache.get("774806096623304738");
                        gaming = bot.channels.cache.get("774806096623304739");
                        questions = bot.channels.cache.get("774806096623304740");
                        otherlanguages = bot.channels.cache.get("774806096623304741");
                        botcommands = bot.channels.cache.get("774806096623304743");
                        appealmute = bot.channels.cache.get("774806096807198750");
                        dankmemer = bot.channels.cache.get("774813652938915850");
                        dankmemer2 = bot.channels.cache.get("774816409133645895");
                        selfadvertising = bot.channels.cache.get("774806097403838481");
                        voicetext = bot.channels.cache.get("774806097982259211");
                    } else {
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

                    }
                    general.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    generaloverflow.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    media.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    gaming.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    questions.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    otherlanguages.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    botcommands.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    appealmute.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    dankmemer.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    dankmemer2.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    selfadvertising.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    voicetext.send(`:oncoming_police_car: All channels have been locked! :oncoming_police_car:
Refer to <#${message.channel.id}>!`)
                    
                    message.channel.send({embed: {
                        title: `Channel Locked`,
                        description: `The server was locked by a staff member. **You are not muted.**
More information will be sent in this channel.
Reason: ${args.slice(1).join(" ")}`,
                        footer: {
                            text: `Locked by ${message.author.tag}`
                        }
                    }})
                    message.delete();
                } else {
                    message.channel.send(`Please type ${prefix}lock [all | channel] [reason]`)
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
});
bot.login (config.token);