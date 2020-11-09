module.exports = {
    name: ">lock",
    category: "moderation",
    description: "Locks channels",
    run: async (bot, message, args) => {
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
                    message.channel.send(`Please type >lock [all | channel] [reason]`)
                }
            }
            
        }
    }
}