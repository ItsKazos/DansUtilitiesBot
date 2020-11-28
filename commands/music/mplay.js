let prefix = config.prefix;

module.exports = {
    name: `${prefix}mplay`,
    category: `music`,
    description: `mplay`,
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if(!member.hasPermission("ADMINISTRATOR")) {
            return;
        }
        if(!args[0]) {
            return message.channel.send("<@" + message.author.id + ">, please type a proper song to play.")
        }
        let isPlaing = bot.player.isPlaying(message.guild.id);
        // If there's already a song playing
        if(isPlaing){
            // Add the song to the queue
            let song = await bot.player.addToQueue(message.guild.id, args.slice(0).join(" "));
            song = song.song;
            message.channel.send(`${song.name} added to queue!`);
        } else {
            // Else, play the song
            let song = await bot.player.play(message.member.voice.channel, args.slice(0).join(" "));
            song = song.song;
            message.channel.send(`Currently playing ${song.name}!`);
        }
    }
}