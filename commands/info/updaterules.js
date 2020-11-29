const discord = require("discord.js");


module.exports = {
    name: `.updaterules`,
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
**Punishment:** Low

**#2:** Advertising isn't allowed anywhere except within the designated advertising channels. 
- DM advertising is also not allowed for @everyone 
**Punishment:** Severe

**#3:** Do not post malicious links or files in the server that can steal information.
**Punishment:** Severe

**#4:** Please keep your topics in the correct channel.
**Punishment:** Low

**#5:** Do not harass other users or be toxic, such as by arguing or insulting others.
**Punishment:** High

**#6:** Don't cause spam by posting repeated text or large blocks of text.
**Punishment:** Low

**#7:** Please make sure all topics are appropriate for children.
- Nothing can be shared that is NSFW, is relating to substance abuse, is disturbing or that displays a grave nature
**Punishment:** High

**#8:** Don't constantly beg for nitro, roles, items or anything similar.
**Punishment:** Low

**#9:** Do not use alts maliciously:
- Don't join giveaways to give yourself an unfair advantage
- Don't try to bypass a punishment given to your main account
**Punishment:** Severe`)
            .setColor("00ff48")

            let embedRules2 = new discord.MessageEmbed()
            .setTitle(`**Rules - Continued**`)
            .setDescription(`**#10:** Only play songs in the music voice channel; no normal videos
**Punishment:** Low

**#11:** No impersonation of well-known people/bots with profile pictures/names.
**Punishment:** Severe

**#12:** You cannot have symbols in your name (including invisible names)
- Characters and symbols must be typeable on a standard English QWERTY keyboard
**Punishment:** Low

**#13:** Don't ask for personal information or distribute any personal information without consent.
**Punishment:** Severe

**#14:** You aren't allowed to misuse spoilers by giving the appearence of swearing or something inappropriate. 
- Using spoilers around a word that may look like the N word will result in severe
**Punishment:** Medium

**#15:** You cannot use your voice to annoy anyone in any VC (ex. voice changers/earrape).
**Punishment:** Medium

**#16:** You aren't allowed to minimod in the server:
- This means acting as a moderator by threatening that people will be punished
- If you have a problem please ping an active staff member
**Punishment:** Medium

**#17:** No interfering with moderator's duties:
- Don't argue with them while they actively moderate
- Don't troll with fake evidence
**Punishment:** Severe

**#18:** Do not ping users with the @Owner of Epicness role or @Co Owner role.
**Punishment:** High

**#19:** Abuse of Mod Mail
**Punishment:** Severe

**20:** Trolling 
- Don't just be in the server to troll members
**Punishment:** Severe

*Rules last updated: November 22nd, 2020.*`)
            .setColor("00ff48")
            
            let embedRulesGuidelines = new discord.MessageEmbed()
            .setTitle(`**Punishment Guidelines**`)
            .setDescription(`**Low**:
**1st offence (Mute):** 0h 15m 0s
**2nd offence (Mute):** 0h 30m 0s
**3rd offence (Mute):** 1h 0m 0s
**4th offence (Mute):** 2h 0m 0s
**5th offence (Mute):** 2h 0m 0s
**6th offence (Ban):** Permanent

**Medium**:
**1st offence (Mute):** 1h 0m 0s
**2nd offence (Mute):** 2h 0m 0s
**3rd offence (Ban):** Permanent

**High**:
**1st offence (Mute):** 24h 0m 0s
**2nd offence (Ban):** Permanent

**Severe**:
**1st offence (Ban):** Permanent`)
            .setColor("00ff48")

            message.channel.send(embedRulesNotes)
            message.channel.send(embedRulesGuidelines)
            message.channel.send(embedRules)
            message.channel.send(embedRules2)
        }
    }
} 