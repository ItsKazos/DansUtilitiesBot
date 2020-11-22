var mysql = require('mysql');
var con = mysql.createConnection({
    host: "na01-sql.pebblehost.com",
    user: "customer_147102_discord",
    password: "T!8jfFr$b#Xo!qn~otpb",
    database: "customer_147102_discord"
})

con.connect(err => {
    if(err) throw err;
    console.log("connected to the database!")
    con.query("SHOW TABLES", console.log);
})

module.exports = {
    name: `>warn`,
    category: `moderation`,
    description: `Warns a user`,
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
        ) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(user) {
                if(args.slice(1).join(" ")) {
                    user.user.send(`You have been warned from **${message.guild.name}** server!
**Reason:** ${args.slice(1).join(" ")}`).catch(message.channel.send(`<@${user.id}> has their DM's disabled.`))
                    const targetMember = message.guild.members.cache.get(user.id)
                    con.query(`CREATE TABLE IF NOT EXISTS warns (id TEXT, previouswarns TEXT)`)
                    con.query(`SELECT * FROM warns WHERE id = '${user.id}'`, (err,rows) => {
                        if(err) throw err;
                
                        let sql;
                        
                        if(rows.length < 1) {
                            sql = `INSERT INTO warns (id, previouswarns) VALUES ('${user.id}', '1')`
                            message.channel.send({embed: {
                                title: `User Warned`,
                                color: `00ff48`,
                                description: `**User:** <@${user.id}>
**Staff:** <@${member.id}>
**Reason:** ${args.slice(1).join(" ")}
**Times Warned:** 1`
                            }})
                        } else {
                            let previouswarns = parseInt(rows[0].previouswarns)
                            sql = `UPDATE warns SET previouswarns = ${Math.floor(previouswarns + 1)} WHERE id = '${user.id}'`
                            message.channel.send({embed: {
                                title: `User Warned`,
                                color: `00ff48`,
                                description: `**User:** <@${user.id}>
**Staff:** <@${member.id}>
**Reason:** ${args.slice(1).join(" ")}
**Times Warned:** ${Math.floor(previouswarns + 1)}`
                            }})
                        }
                        con.query(sql, console.log())
                    })
                } else {
                    message.channel.send({embed: {
                        title: `Command syntax failed!`,
                        color: `fc0303`,
                        description: `Please do >warn (Member) (Reason)`
                    }});
                }
            } else {
                message.channel.send({embed: {
                    title: `Command syntax failed!`,
                    color: `fc0303`,
                    description: `Please do >warn (Member) (Reason)`
                }});
            }
        }

    }
}