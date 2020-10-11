const discord = require("discord.js");
const config = require("./config.json")
const bot = new discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready for action!`);
    bot.user.setActivity("I see you :eyes:");
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}test`) {
        return message.channel.send(`Test complete!`);
    }
    if (cmd === `${prefix}ping`) {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to execute this command!")
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send(`You did not mention a user or provide an ID!`);
        if(!args.slice(1).join(" ")) return message.channel.send("You did not specify your message");
        user.user.send(args.slice(1).join()).catch(() => message.channel.send("That member has their dms disabled!")).then(() => message.channel.send(`Sent a message to <@${user.id}>`))
    }
    if (cmd === `${prefix}kick`) {
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${targetMember} has been kicked.`)
            } else{
                message.channel.send(`<@${member.id}>, please specify a player to kick from the server.`)
            }
        } else{
            message.channel.send(`<@${member.id}>, you do not have permission to use this command.`)
        }
    }
});

bot.login (config.token);