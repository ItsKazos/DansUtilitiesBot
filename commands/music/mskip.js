let prefix = config.prefix;

module.exports = {
    name: `${prefix}mskip`,
    category: `music`,
    description: `mskip`,
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        let song = await bot.player.skip(message.guild.id);
        message.channel.send(`${song.name} skipped!`);
    }
}