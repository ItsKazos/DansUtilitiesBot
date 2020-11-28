const discord = require("discord.js");

module.exports = {
    name: `.mhelp`,
    category: `music`,
    description: `mhelp`,
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        let helpEmbed = new discord.MessageEmbed()
        .setTitle("Help with Music")
        .setDescription(`**Commands:**
>mplay [Song] - Plays a song
>mqueue - Lists songs in queue
>mclearqueue - Clears the queue
>mskip - Skips the current song
>mstop - Stops the music
>mvolume [Volume] - Sets the players volume`)
        .setColor("00ff48")
        message.channel.send(helpEmbed)
    }
}