const discord = require("discord.js");

const config = require("./config.json")
let prefix = config.prefix;

module.exports = {
    name: `${prefix}updaterules`,
    category: "info",
    description: "Returns new rules",
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if (member.hasPermission("ADMINISTRATOR")) {
            let embedRulesNotes = new discord.MessageEmbed()
            .setTitle("**Notes**")
            .setDescription(`All rules in the server apply at all times and in all places. If you break a rule you will usually receive a warning or a mute.

➣All Discord Terms of Service and Guidelines apply to the server's rules. We have linked all of the discord terms of service and guidelines below. Please read them. If you do not read the rules, you will still be punished for breaking them. It is not our moderator's responsibility to make sure that you know all of the rules.
:link: https://discordapp.com/terms
:link: https://discordapp.com/guidelines
➣This server is english only. Please do not speak other languages.
➣ Use common sense. Moderators reserve the privilege to punish rule breakers and punish players using loop holes etc.`)
            .setColor("00ff48")

            let embedRules = new discord.MessageEmbed()
            .setTitle("**Rules**")
            .setDescription(`**#1:** Do not swear in the server, or attempt to bypass the filter by changing the characters of a banned word.
**Punishment:**
1st offence: 1 day mute
2nd offence: 7 day mute
3rd offence: 30 day mute
4th offence: Permanent ban

**#2:** Advertising isn't allowed anywhere except within the designated advertising channels. 
- DM advertising is also not allowed for @everyone 
**Punishment:**
1st offence: Permanent ban

**#3:** Do not post malicious links or files in the server that can steal information.
**Punishment:**
1st offence: Permanent ban

**#4:** Please keep your topics in the correct channel.
**Punishment:**
1st offence: Warning

**#5:** Do not harass other users or be toxic, such as by arguing or insulting others.
**Punishment:**
1st offence: 1 day mute
2nd offence: 7 day mute
3rd offence: 30 day mute
4th offence: Permanent ban

**#6:** Don't cause spam by posting repeated text or large blocks of text.
**Punishment:**
1st offence: Warning
2nd offence: 1 hour mute
3rd offence: 1 day mute
4th offence: 7 day mute

**#7:** Please make sure all topics are appropriate for children.
- Nothing can be shared that is NSFW, is relating to substance abuse, is disturbing or that displays a grave nature
**Punishment:**
1st offence: 7 day ban
2nd offence: 30 day ban

**#8:** Don't constantly beg for nitro, roles, items or anything similar.
**Punishment:**
1st offence: Warning
2nd offence: 1 hour mute
3rd offence: 1 day mute
4th offence: 7 day mute

**#9:** Do not use alts maliciously:
- Don't join giveaways to give yourself an unfair advantage
- Don't try to bypass a punishment given to your main account
**Punishment:**
1st offence: Permanent blacklist on all of the alt accounts (And a warning point for your main account)

**#10:** Only play songs in the music voice channel; no normal videos
**Punishment:**
1st offence: Warning
2nd offence: 1 hour mute
3rd offence: 1 day mute
4th offence: 7 day mute`)
            .setColor("00ff48")

            let embedRules2 = new discord.MessageEmbed()
            .setTitle(`**Rules - Continued**`)
            .setDescription(`**#11:** No impersonation of well-known people/bots with profile pictures/names.
**Punishment:**
1st offence: Permanent ban until you change name/profile picture

**#12:** You cannot have symbols in your name (including invisible names)
- Characters and symbols must be typeable on a standard English QWERTY keyboard
**Punishment:**
1st offence: You will receive a new nickname and a warning

**#13:** Don't ask for personal information or distribute any personal information without consent.
**Punishment:**
1st offence: Permanent ban

**#14:** You aren't allowed to misuse spoilers by giving the appearence of swearing or something inappropriate. 
- Using spoilers around a word that may look like the N word will result in a ban
**Punishment:**
1st offence: 1 day mute
2nd offence: 7 day mute

**#15:** You cannot use your voice to annoy anyone in any VC (ex. voice changers/earrape).
**Punishment:**
1st offence: Warning
2nd offence: Server mute

**#16:** You aren't allowed to minimod in the server:
- This means acting as a moderator by threatening that people will be punished
- If you have a problem please ping an active staff member
**Punishment:**
1st offence: Warning
2nd offence: 1 hour mute
3rd offence: 1 day mute
4th offence: 7 day mute

**#17:** No interfering with moderator's duties:
- Don't argue with them while they actively moderate
- Don't troll with fake evidence
**Punishment:**
1st offence: Warning
2nd offence: 1 hour mute
3rd offence: 1 day ban

**#18:** Do not ping users with the @Owner of Epicness role or @Co Owner role.
**Punishment:**
1st offence: Warning
2nd offence: 1 day mute

**#19:** Abuse of Mod Mail
**Punishment:**
1st offence: Perrmanent ban from every server with the bot

**20:** Trolling 
- Don't just be in the server to troll members
**Punishment:**
1st offence: Permanent ban

*Rules last updated: November 22nd, 2020.*`)
            .setColor("00ff48")

            message.channel.send(embedRulesNotes)
            message.channel.send(embedRules)
            message.channel.send(embedRules2)
        }
    }
} 