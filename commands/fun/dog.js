const discord = require("discord.js");
const randomPuppy = require('random-puppy');
const config = require("./config.json")
let prefix = config.prefix;

module.exports = {
    name: `${prefix}dog`,
    category: `fun`,
    description: `dog`,
    run: async (bot, message, args) => {
        randomPuppy()
            .then(url => {
                const embed = new discord.MessageEmbed()
                .setAuthor('A cute little puppy')
                .setColor('00ff48')
                .setImage(url)
                .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())
                message.channel.send(embed)
            })
    }
}