const ms = require('ms')

module.exports = {
    name: `>tempban`,
    category: `moderation`,
    description: `tempban`,
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
                    description: `Please do >tempban (Member) (Timestamp) (Reason)`
                }});
            }
            if(user) {
                if(args.slice(2).join(" ")) {
                    user.user.send(`You have been banned from ${message.guild.name}!
**Reason:** ${args.slice(2).join(" ")}
**Duration:** ${args[1]}`).catch(message.channel.send(`<@${user.id}> has their DM's disabled.
**Appeal in:** https://discord.gg/aKfcKs2RQg`))
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
                        description: `Please do >tempban (Member) (Timestamp) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do >tempban (Member) (Timestamp) (Reason)`
                }});
            }
        }
    }
}