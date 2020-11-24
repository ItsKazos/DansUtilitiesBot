module.exports = {
    name: `>b`,
    category: `moderation`,
    description: `Bans a user`,
    run: async (bot, message, args) => {
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(user) {
                if(args.slice(1).join(" ")) {
                    user.user.send(`You have been banned from **${message.guild.name}** server!
**Reason:** ${args.slice(1).join(" ")}
**Appeal in:** https://discord.gg/aKfcKs2RQg`).catch(message.channel.send(`<@${user.id}> has their DM's disabled.`))
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
                        description: `Please do >ban (Member) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do >ban (Member) (Reason)`
                }});
            }
        }
    }
}