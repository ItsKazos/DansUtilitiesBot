const discord = require("discord.js");

const config = require("./config.json")
let prefix = config.prefix;
module.exports = {
    name: `${prefix}reply`,
    category: `moderation`,
    description: `reply`,
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if(!message.channel.id === `775051348897955841`) {
            return;
        }
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) {
            return message.channel.send("Please supply a user.")
        }
        if (!args.slice(1).join(" ")) {
            return message.channel.send("Please supply an update.")
        }
        user.user.send(`**Your modmail status was updated**
**Message from:** <@${member.id}>
**Message:** ` + '``' + args.slice(1).join(" ") + '``').catch(console.log("error"))
        message.channel.send("DMed the user.")
    }
}