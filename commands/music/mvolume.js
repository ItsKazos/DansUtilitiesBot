module.exports = {
    name: `>mvolume`,
    category: `music`,
    description: `mvolume`,
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        if(!args[0]) {
            return message.channel.send("<@" + message.author.id + ">, please type a proper volume.")
        }
        if(isNaN(args[0])) {
            return message.channel.send("<@" + message.author.id + ">, please type a proper volume.")
        }
        bot.player.setVolume(message.guild.id, parseInt(args[0]));
        message.channel.send(`Volume set to ${args[0]} !`);
    }
}