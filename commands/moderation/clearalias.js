module.exports = {
    name: `>c`,
    category: `moderation`,
    description: `clear`,
    run: async (bot, message, args) => {
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
                    description: `Please do >clear (Amount)`
                }});
            } else {
                if(!isNaN(amount)) {
                    message.channel.bulkDelete(amount)
                    message.channel.send(`Deleted ${amount}!`).then(msg => msg.delete({ timeout: 5000 })).catch();
                } else {
                    message.channel.send({embed: {
                        title: `Command syntax failed!`,
                        color: `fc0303`,
                        description: `Please do >clear (Amount)`
                    }});
                }
            }
        }
    }
}