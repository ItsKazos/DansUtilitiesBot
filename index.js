const discord = require("discord.js");
const config = require("./config.json")
const antispam = require('better-discord-antispam');
const bot = new discord.Client({disableEveryone: true});
const { Player } = require("discord-music-player");
const player = new Player(bot);
const ms = require('ms')
bot.player = player;
var money = require('discord-money');
var rn = require('random-number')
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
    var options = {
        min:  0
      , max:  25
      , integer: true
    }
    randommoney = rn(options)
    money.updateBal(message.author.id, randommoney)
    if (cmd === `${prefix}balance`) {
        const { member, mentions } = message
        money.fetchBal(message.author.id).then((i) => {
            message.channel.send(`**Balance:** $${i.money}`);
        })
    }
    if (cmd === `${prefix}mhelp`) {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        let helpEmbed = new discord.MessageEmbed()
        .setTitle("Help with Music")
        .setDescription(`**Commands:**
${prefix}mplay [Song] - Plays a song
${prefix}mqueue - Lists songs in queue
${prefix}mclearqueue - Clears the queue
${prefix}mskip - Skips the current song
${prefix}mstop - Stops the music
${prefix}mvolume [Volume] - Sets the players volume`)
        .setColor("00ff48")
        message.channel.send(helpEmbed)
    }
    if (cmd === `${prefix}mplay`) {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        if(!args[0]) {
            return message.channel.send("<@" + message.author.id + ">, please type a proper song to play.")
        }
        let channel = bot.channels.cache.get('769969625324585021');
        channel.join().then(connection => {
            connection.voice.setSelfDeaf(true);
        });
        let isPlaing = bot.player.isPlaying(message.guild.id);
        // If there's already a song playing
        if(isPlaing){
            // Add the song to the queue
            let song = await bot.player.addToQueue(message.guild.id, args[0]);
            song = song.song;
            message.channel.send(`${song.name} added to queue!`);
        } else {
            // Else, play the song
            let song = await bot.player.play(message.member.voice.channel, args[0]);
            song = song.song;
            message.channel.send(`Currently playing ${song.name}!`);
        }
    }
    if (cmd === `${prefix}mqueue`) {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        let queue = await bot.player.getQueue(message.guild.id);
        message.channel.send('Server queue:\n'+(queue.songs.map((song, i) => {
            return `${i === 0 ? 'Current' : `#${i+1}`} - ${song.name} | ${song.author}`
        }).join('\n')));
    }
    if (cmd === `${prefix}mclearqueue`) {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        bot.player.clearQueue(message.guild.id);
        message.channel.send('Queue cleared!');
    }
    if (cmd === `${prefix}mskip`) {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        let song = await bot.player.skip(message.guild.id);
        message.channel.send(`${song.name} skipped!`);
    }
    if (cmd === `${prefix}mstop`) {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        bot.player.stop(message.guild.id);
        message.channel.send('Music stopped!');
    }
    if (cmd === `${prefix}mvolume`) {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        if(!args[0]) {
            return message.channel.send("<@" + message.author.id + ">, please type a proper volume.")
        }
        if(isNaN(args[0])) {
            return message.channel.send("<@" + message.author.id + ">, please type a proper volume.")
        }
        bot.player.setVolume(message.guild.id, parseInt(args[0]));
        message.channel.send(`Volume set to ${args[0]} !`);
    }
    if (cmd === `${prefix}addping`) {
        const { member, mentions } = message
        if(message.guild.id === `762104108261572610`) {
            if (args[0]) {
                if (args[0] === `giveaways`) {
                    let role = message.guild.roles.cache.find(r => r.name === "Giveaway Ping");
                    member.roles.add(role)
                    message.channel.send("<@" + member.id + ">, added the role ``Giveaway Ping`` to you.")
                } else {
                    if (args[0] === `announcements`) {
                        let role = message.guild.roles.cache.find(r => r.name === "All Announcements");
                        member.roles.add(role)
                        message.channel.send("<@" + member.id + ">, added the role ``All Announcements`` to you.")
                    } else {
                        if (args[0] === `staffupdates`) {
                            let role = message.guild.roles.cache.find(r => r.name === "Staff Updates");
                            member.roles.add(role)
                            message.channel.send("<@" + member.id + ">, added the role ``Staff Updates`` to you.")
                        } else {
                            if (args[0] === `all`) {
                                let role = message.guild.roles.cache.find(r => r.name === "Staff Updates");
                                member.roles.add(role)
                                let rolea = message.guild.roles.cache.find(r => r.name === "All Announcements");
                                member.roles.add(rolea)
                                let roleb = message.guild.roles.cache.find(r => r.name === "Giveaway Ping");
                                member.roles.add(roleb)
                                message.channel.send("<@" + member.id + ">, added the role ``All`` to you.")
                            } else {
                                message.channel.send("<@" + member.id + ">, please type ``" + prefix + "addping [giveaways | announcements | staffupdates | all]``, ``" + args[0] + "`` did not match any of the following.")
                            }
                            
                        }
                    }
                }
            } else {
                message.channel.send("<@" + member.id + ">, please type ``" + prefix + "addping [giveaways | announcements | staffupdates | all]``.")
            }
        } else {
            message.channel.send("<@" + member.id + ">, you can't use this command in ``" + message.guild.name + " server!``, This command requires to be used in ``Dan's Hangout``.")
        }
    }

    if (cmd === `${prefix}removeping`) {
        const { member, mentions } = message
        if(message.guild.id === `762104108261572610`) {
            if (args[0]) {
                if (args[0] === `giveaways`) {
                    let role = message.guild.roles.cache.find(r => r.name === "Giveaway Ping");
                    member.roles.remove(role)
                    message.channel.send("<@" + member.id + ">, removed the role ``Giveaway Ping`` from you.")
                } else {
                    if (args[0] === `announcements`) {
                        let role = message.guild.roles.cache.find(r => r.name === "All Announcements");
                        member.roles.remove(role)
                        message.channel.send("<@" + member.id + ">, removed the role ``All Announcements`` from you.")
                    } else {
                        if (args[0] === `staffupdates`) {
                            let role = message.guild.roles.cache.find(r => r.name === "Staff Updates");
                            member.roles.remove(role)
                            message.channel.send("<@" + member.id + ">, removed the role ``Staff Updates`` from you.")
                        } else {
                            if (args[0] === `all`) {
                                let role = message.guild.roles.cache.find(r => r.name === "Staff Updates");
                                member.roles.remove(role)
                                let rolea = message.guild.roles.cache.find(r => r.name === "All Announcements");
                                member.roles.remove(rolea)
                                let roleb = message.guild.roles.cache.find(r => r.name === "Giveaway Ping");
                                member.roles.remove(roleb)
                                message.channel.send("<@" + member.id + ">, removed the role ``All`` from you.")
                            } else {
                                message.channel.send("<@" + member.id + ">, please type ``" + prefix + "removeping [giveaways | announcements | staffupdates | all]``, ``" + args[0] + "`` did not match any of the following.")
                            }
                            
                        }
                    }
                }
            } else {
                message.channel.send("<@" + member.id + ">, please type ``" + prefix + "removeping [giveaways | announcements | staffupdates | all]``.")
            }
        } else {
            message.channel.send("<@" + member.id + ">, you can't use this command in ``" + message.guild.name + " server!``, This command requires to be used in ``Dan's Hangout``.")
        }
    }


    if (cmd === `${prefix}suggest`) {
        const { member, mentions } = message
        if (message.guild.id === `762104108261572610`) {
            if (!args.slice(0).join(" ")) {
                return message.channel.send("<@" + member.id + ">, please type something to suggest!")
            }
            suggestions = bot.channels.cache.get("775031377262280745");
            let embedPoll = new discord.MessageEmbed()
            .setTitle("Suggestion")
            .setDescription(args.slice(0).join(" "))
            .setColor("00ff48")
            .setAuthor(`${message.author.tag}`)
            let msgEmbed = await suggestions.send(embedPoll);
            await msgEmbed.react('⬆️')
            await msgEmbed.react('⬇️')
            message.channel.send("<@" + member.id + ">, your suggestion is live in <#775031377262280745>!")
        } else {
            if (message.guild.id === `774806096019324938`) {

            } else {
                message.channel.send("<@" + member.id + ">, you can't use this command in ``" + message.guild.name + " server!``, This command requires to be used in ``Dan's Hangout`` or ``Dan's MC Hangout``.")
            }
        }
    }
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
                message.channel.updateOverwrite(everyone, {
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
                        everyone = '774806096019324938'
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
                        everyone = '762104108261572610'
                    }
                    channels.forEach(channel => {
                        channel.updateOverwrite(everyone, {
                            SEND_MESSAGES: false
                        });
                    })

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
                message.channel.updateOverwrite(everyone, {
                    SEND_MESSAGES: null
                });
                message.channel.send(`The channel has been unlocked to all members.`)
            } else {
                if (args.slice(0).join(" ") == `all`) {
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
                        everyone = '774806096019324938'
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
                        everyone = '762104108261572610'
                    }
                    general.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    generaloverflow.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    media.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    gaming.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    questions.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    otherlanguages.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    botcommands.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    appealmute.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    dankmemer.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    dankmemer2.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    selfadvertising.updateOverwrite(everyone, {
                        SEND_MESSAGES: null
                    });
                    voicetext.updateOverwrite(everyone, {
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