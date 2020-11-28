const discord = require("discord.js");

const config = require("./config.json")
let prefix = config.prefix;

module.exports = {
    name: `${prefix}updateroles`,
    category: "info",
    description: "Returns new roles",
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if (member.hasPermission("ADMINISTRATOR")) {
            let embedLevelRoles = new discord.MessageEmbed()
            .setTitle("**Level Roles**")
            .setDescription(`These are acquired by reaching the level stated on the role using <@534589798267224065>.
Check your level using the ` +  '``ar!member stats``' + ` command in #bot-commands.

<@&779530123681857546> - External emojis, video in VC, post images in <#762115512200331314>
<@&779530122012524544> - Can advertise in <#762116284342206464>, Can chat in <#779545498193231872> 
<@&779530121098297376> - Can change nickname
<@&779530120594980880> - Can access <#779546052084105216>, Can enter <#779546147785408514> givewaays
<@&779530010393837609> - Can post photos in <#762115463911833641>
<@&779530011123515394> - Can chat in <#779546701240598548>
<@&779530011811381248> - Nothing yet :)
<@&779530010272464906> - Add reactions to messages
<@&779529221634654228> - Can talk in <#779550295205478410> and Exclusive VC, Can advertise in <#779551178576363582>, Enter <#779551550120132608> and use <#779551802076037130>
<@&779529219129868309> - Nothing yet :)
<@&779528883145932832> - Nothing yet :)
<@&779528882482315266> - Nothing yet :)
<@&779528881437802567> - Nothing yet :)
<@&779528792707694632> - Nothing yet :)
<@&762104311072555031> - Highest on level leaderboard (not staff) - Show up above everyone else and have a custom role color`)
            .setColor("00ff48")
            let embedEventRoles = new discord.MessageEmbed()
            .setTitle("**Event Roles**")
            .setDescription(`<@&762104310480896000> - Given to those that win in special events, these can be made by Dan for videos or those set up by staff`)
            .setColor("00ff48")
            let embedSpecialRoles = new discord.MessageEmbed()
            .setTitle("**Special Roles**")
            .setDescription(`<@&762104318581014564>  + <@&770110734176485417> ➣ Given to people that donated $1.00+ by typing "donate" in <#762154748530130984> - Can change nickname

<@&762104307641614336> - Know me in real life
<@&779528883832750161> - Must be honored by Dan to be in the server`)
            .setColor("00ff48")
            let embedCreatorRoles = new discord.MessageEmbed()
            .setTitle("**Creator Roles**")
            .setDescription(`<@&762104319277006859> - Must have a YouTube channel with 100+ subs and 10K+ total views connected to Discord
- Can post videos/streams in <#762116772722638869>
- Can change nickname
- Can access <#779546701240598548>, <#779546147785408514> and <#762116284342206464> 

<@&762104320249298994> - Must have a Twitch channel with 100+ followers connected to Discord. - Same as YouTube Creator perks

<@&762104312088231937> - Post 10-15 arts (photos don't count) in <#762117400472453170> by messaging art posters - Able to post other's art into the art channels
<@&779529001420587009> - (Same as Art Poster) - Can post personal art into the art channels`)
            .setColor("00ff48")
            let embedGiveawayRoles = new discord.MessageEmbed()
            .setTitle("**Giveaway-Related Roles**")
            .setDescription(`<@&762104321180565515> - Win and collect a prize from any giveaway in the server
<@&762104317359947787> - To host a giveaway please message a person with this role - Able to host giveaways for people in the server`)
            .setColor("00ff48")
            let embedStaffRoles = new discord.MessageEmbed()
            .setTitle("**Staff Roles**")
            .setDescription(`<@&762104316323823646> - Given to staff members that have resigned from the team
<@&779528474603028490> - Given to those that work on bots in this server
<@&762104304147628062> - Given to the highest performing staff member for the previous month

<@&762104306282790952> - Pass the staff application to get this
<@&762104304583966731> - Be promoted from Trainee Moderator
<@&762104302784348220> - Pass the Head Moderator application or be handpicked from Moderator
<@&762104301933035531>  - Be promoted from head moderator
<@&762104300255576065>  - Co-own the server
<@&762104299575574558> - Own the server`)
            .setColor("00ff48")

            message.channel.send(embedLevelRoles)
            message.channel.send(embedEventRoles)
            message.channel.send(embedSpecialRoles)
            message.channel.send(embedCreatorRoles)
            message.channel.send(embedGiveawayRoles)
            message.channel.send(embedStaffRoles)
        }
    }
} 