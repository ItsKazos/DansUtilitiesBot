module.exports = {
    name: ">unlock",
    category: "moderation",
    description: "Unlocks channels",
    run: async (bot, message, args) => {
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
                    message.channel.send(`Please type >unlock [all | channel]`)
                }
            }
            
        }
    }
}