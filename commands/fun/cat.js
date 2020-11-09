const discord = require("discord.js");
const { get } = require("snekfetch");

module.exports = {
    name: `>cat`,
    category: `fun`,
    description: `cat`,
    run: async (bot, message, args) => {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new discord.MessageEmbed()
                .setAuthor('A cute little kitty')
                .setColor('00ff48')
				.setImage(res.body.file)
                .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())
				return message.channel.send(embed);
			});
		} catch(err) {
			return console.log(err.stack);
		}
    }
}