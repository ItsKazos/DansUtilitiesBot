module.exports = {
    name: `>mstop`,
    category: `music`,
    description: `mstop`,
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        bot.player.stop(message.guild.id);
        message.channel.send('Music stopped!');
    }
}