let prefix = config.prefix;

module.exports = {
    name: `${prefix}ping`,
    category: "info",
    description: "Returns ping",
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if (member.hasPermission("ADMINISTRATOR")) {
            message.channel.send({embed: {
                title: `Bot latency/ping`,
                description: `Latency is ${Date.now() - message.createdTimestamp}ms
API Latency is ${Math.round(bot.ws.ping)}ms.`
            }})
        }
    }
}