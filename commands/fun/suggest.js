module.exports = {
    name: `>suggest`,
    category: `fun`,
    description: `suggest`,
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if (message.guild.id === `762104108261572610`) {
            if (!args.slice(0).join(" ")) {
                return message.channel.send("<@" + member.id + ">, please type something to suggest!")
            }
            suggestions = bot.channels.cache.get("775031377262280745");
            let embedPoll = new discord.MessageEmbed()
            .setTitle("Suggestion")
            .setDescription(args.slice(0).join(" "))
            .setColor("00ff48")
            .setAuthor(`${message.author.tag}`)
            let msgEmbed = await suggestions.send(embedPoll);
            await msgEmbed.react('⬆️')
            await msgEmbed.react('⬇️')
            message.channel.send("<@" + member.id + ">, your suggestion is live in <#775031377262280745>!")
        } else {
            if (message.guild.id === `774806096019324938`) {

            } else {
                message.channel.send("<@" + member.id + ">, you can't use this command in ``" + message.guild.name + " server!``, This command requires to be used in ``Dan's Hangout`` or ``Dan's MC Hangout``.")
            }
        }
    }
}