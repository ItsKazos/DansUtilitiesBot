module.exports = {
    name: `>mute`,
    aliases: ['>shut', '>m'],
    category: `moderation`,
    description: `Mutes a user`,
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
                        description: `Please do >mute (Member) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do >mute (Member) (Reason)`
                }});
            }
        }
    }
}