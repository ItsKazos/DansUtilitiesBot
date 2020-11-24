const ms = require('ms')

module.exports = {
    name: `>tempmute`,
    aliases: ['>tm', '>tmute'],
    category: `moderation`,
    description: `tempmute`,
    run: async (bot, message, args) => {
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
                    description: `Please do >tempmute (Member) (Timestamp) (Reason)`
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
                        description: `Please do >tempmute (Member) (Timestamp) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do >tempmute (Member) (Timestamp) (Reason)`
                }});
            }
        }
    }
}