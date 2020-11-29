
module.exports = {
    name: `.sm`,
    category: "moderation",
    description: "Sets slowmode",
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            let slowmode = args.slice(0).join(" ")
            if(!slowmode)return message.channel.send(`Please put a number in the command`)
            if(isNaN(slowmode))return message.channel.send(`That is not a number!`)
            if(parseInt(slowmode) <= 0) return message.channel.send("Slowmode MUST be 0 or above.") 
            if(parseInt(slowmode) >= 21600) return message.channel.send("Slowmode MUST be 21600 or below.") 
            message.channel.setRateLimitPerUser(slowmode)
            message.channel.send(`Slowmode set to ${slowmode}`)
        }
    }
}