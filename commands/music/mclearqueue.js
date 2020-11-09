module.exports = {
    name: `>mclearqueue`,
    category: `music`,
    description: `clearqueue`,
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        bot.player.clearQueue(message.guild.id).catch(err => {
            throw err;
        })
        message.channel.send('Queue cleared!');
    }
}