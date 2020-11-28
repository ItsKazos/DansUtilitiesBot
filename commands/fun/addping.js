const config = require("./config.json")
let prefix = config.prefix;
module.exports = {
    name: `${prefix}addping`,
    category: `fun`,
    description: `addping`,
    run: async (bot, message, args) => {
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
                                message.channel.send("<@" + member.id + ">, please type ``>addping [giveaways | announcements | staffupdates | all]``, ``" + args[0] + "`` did not match any of the following.")
                            }
                            
                        }
                    }
                }
            } else {
                message.channel.send("<@" + member.id + ">, please type ``>addping [giveaways | announcements | staffupdates | all]``.")
            }
        } else {
            message.channel.send("<@" + member.id + ">, you can't use this command in ``" + message.guild.name + " server!``, This command requires to be used in ``Dan's Hangout``.")
        }
    }
}