
module.exports = {
    name: `.clearhistory`,
    category: "moderation",
    description: "Clear History",
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if (member.hasPermission('ADMINISTRATOR')) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!user) {
                message.channel.send("Please mention a user or a members ID")
            }con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
            con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                if(err) throw err;
        
                let sql;
                
                if(rows.length < 1) {
                    sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                } else {
                    sql = `UPDATE punishes SET previouspunish = '0', swearing = '0', advertising = '0', maliciouslinks = '0', incorrectchannel = '0', toxicity = '0', spam = '0', nsfw = '0', begging = '0', malalts = '0', vidsmusic = '0', impersonation = '0', symbols = '0', personalinfo = '0', spoilermisuse = '0', earrape = '0', minimod = '0', interfere = '0', pingowners = '0', modmailabuse = '0' WHERE id = '${user.id}'`
                    message.channel.send(`Cleared history of <@${user.id}>.`)
                }
                con.query(sql, console.log())
            })
        }
    }
}