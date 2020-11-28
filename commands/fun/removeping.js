let prefix = config.prefix;

module.exports = {
    name: `${prefix}removeping`,
    category: `fun`,
    description: `removeping`,
    run: async (bot, message, args) => {
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
                                message.channel.send("<@" + member.id + ">, please type ``>removeping [giveaways | announcements | staffupdates | all]``, ``" + args[0] + "`` did not match any of the following.")
                            }
                            
                        }
                    }
                }
            } else {
                message.channel.send("<@" + member.id + ">, please type ``>removeping [giveaways | announcements | staffupdates | all]``.")
            }
        } else {
            message.channel.send("<@" + member.id + ">, you can't use this command in ``" + message.guild.name + " server!``, This command requires to be used in ``Dan's Hangout``.")
        }
    }
}