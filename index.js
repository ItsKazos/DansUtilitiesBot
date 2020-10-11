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
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Some title')
            .setDescription('Some description here');
        message.channel.send(exampleEmbed);
    }
    if (cmd === `${prefix}mute`) {
        let role = message.guild.roles.find(r => r.name === "Muted");
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            if (target) {
                const target = mentions.users.first();
                target.roles.add(role)
                message.channel.send(`<@${target.id}> has been muted.`)
            } else {
                message.channel.send(`<@${member.id}>, please specify a user to mute.`)
            }
        } else{
            message.channel.send(`<@${member.id}> Hey! You can't use that command!`)
        }
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
                targetMember.kick(`Kicked by: ${member.name}`)
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