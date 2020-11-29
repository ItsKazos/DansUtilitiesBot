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
    name: `.warn`,
    category: `moderation`,
    description: `Punishes a user`,
    run: async (bot, message, args) => {
        const { member, mentions } = message

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
        ) {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            let role = message.guild.roles.cache.find(r => r.name === "Muted");
            if (!role) {
                return message.channel.send("Couldn't find the muted role!");
            }
            if (user.hasPermission("ADMINISTRATOR")) {
                return message.channel.send(`You aren't allowed to punish administrators.`)
            }
            if(!member.hasPermission("ADMINISTRATOR")) {
                if(member.hasPermission("KICK_MEMBERS")) {
                    if(user.hasPermission("KICK_MEMBERS") || user.hasPermission("ADMINISTRATOR")) {
                        return message.channel.send("You aren't allowed to punish staff members!")
                    }
                }
            }
            if(user) {
                if(args[1] === `1`) {
                    con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                    con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                        if(err) throw err;
                
                        let sql;
                        
                        if(rows.length < 1) {
                            sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Swearing` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                            message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                            user.roles.add(role)
                            setTimeout(function() {
                                user.roles.remove(role)
                            }, 86400 * 1000);
                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Swearing` + '``' + `.
You now have ` + '``' + '1' + '``' + ` warnings in this category, and ` + '``' + '1' + '``' + ` total warnings.`)
                            user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                        } else {
                            let currentwarn = parseInt(rows[0].previouspunish)
                            let otherwarn = parseInt(rows[0].swearing)
                            sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, swearing = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Swearing` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Swearing` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                            if (Math.floor(otherwarn + 1) >= 4) {
                                message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                const targetMember = message.guild.members.cache.get(user.id)
                                setTimeout(function() {
                                    targetMember.ban({reason: `Auto-ban`})
                                }, 1000)
                            } else {
                                if (Math.floor(otherwarn + 1) == 3) {
                                    message.channel.send(`<@${user.id}> has been auto-muted for 24 0h 0m 0s`)
                                    user.user.send(`You have been auto-muted for 24 0h 0m 0s`)
                                    user.roles.add(role)
                                    setTimeout(function() {
                                        user.roles.remove(role)
                                    }, 2073600 * 1000);
                                } else {
                                    if (Math.floor(otherwarn + 1) == 2) {
                                        message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                        user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                        user.roles.add(role)
                                        setTimeout(function() {
                                            user.roles.remove(role)
                                        }, 604800 * 1000);
                                    } else {
                                        if (Math.floor(otherwarn + 1) == 1) {
                                            message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                            user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                            user.roles.add(role)
                                            setTimeout(function() {
                                                user.roles.remove(role)
                                            }, 86400 * 1000);
                                        } 
                                    }
                                }
                            }
                        }
                        con.query(sql, console.log())
                    })
                } else {
                    if(args[1] === `2`) {
                        con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                        con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                            if(err) throw err;
                    
                            let sql;
                            
                            if(rows.length < 1) {
                                sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Advertising` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Advertising` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                const targetMember = message.guild.members.cache.get(user.id)
                                setTimeout(function() {
                                    targetMember.ban({reason: `Auto-ban`})
                                }, 1000)
                            } else {
                                let currentwarn = parseInt(rows[0].previouspunish)
                                let otherwarn = parseInt(rows[0].advertising)
                                sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, advertising = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Advertising` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Advertising` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                const targetMember = message.guild.members.cache.get(user.id)
                                setTimeout(function() {
                                    targetMember.ban({reason: `Auto-ban`})
                                }, 1000)
                            }
                            con.query(sql, console.log())
                        })
                    } else {
                        if(args[1] === `3`) {
                            con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                            con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                if(err) throw err;
                        
                                let sql;
                                
                                if(rows.length < 1) {
                                    sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                                    message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Malicious Links or Files` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                    user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Malicious Links or Files` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                    message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                    user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                    const targetMember = message.guild.members.cache.get(user.id)
                                    setTimeout(function() {
                                        targetMember.ban({reason: `Auto-ban`})
                                    }, 1000)
                                } else {
                                    let currentwarn = parseInt(rows[0].previouspunish)
                                    let otherwarn = parseInt(rows[0].maliciouslinks)
                                    sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, maliciouslinks = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                    message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Malicious Links or Files` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                    user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Malicious Links or Files` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                    message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                    user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                    const targetMember = message.guild.members.cache.get(user.id)
                                    setTimeout(function() {
                                        targetMember.ban({reason: `Auto-ban`})
                                    }, 1000)
                                }
                                con.query(sql, console.log())
                            })
                        } else {
                            if(args[1] === `4`) {
                                con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                    if(err) throw err;
                            
                                    let sql;
                                    
                                    if(rows.length < 1) {
                                        sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Incorrect Channel` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Incorrect Channel` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                    } else {
                                        let currentwarn = parseInt(rows[0].previouspunish)
                                        let otherwarn = parseInt(rows[0].incorrectchannel)
                                        sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, incorrectchannel = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Incorrect Channel` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Incorrect Channel` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                    }
                                    con.query(sql, console.log())
                                })
                            } else {
                                if(args[1] === `5`) {
                                    con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                    con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                        if(err) throw err;
                                
                                        let sql;
                                        
                                        if(rows.length < 1) {
                                            sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Toxicity` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Toxicity` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                            message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                            user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                            user.roles.add(role)
                                            setTimeout(function() {
                                                user.roles.remove(role)
                                            }, 86400 * 1000);
                                        } else {
                                            let currentwarn = parseInt(rows[0].previouspunish)
                                            let otherwarn = parseInt(rows[0].toxicity)
                                            sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, toxicity = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Toxicity` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Toxicity` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                            if (Math.floor(otherwarn + 1) >= 4) {
                                                message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                                user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                                const targetMember = message.guild.members.cache.get(user.id)
                                                setTimeout(function() {
                                                    targetMember.ban({reason: `Auto-ban`})
                                                }, 1000)
                                            } else {
                                                if (Math.floor(otherwarn + 1) == 3) {
                                                    message.channel.send(`<@${user.id}> has been auto-muted for 24 0h 0m 0s`)
                                                    user.user.send(`You have been auto-muted for 24 0h 0m 0s`)
                                                    user.roles.add(role)
                                                    setTimeout(function() {
                                                        user.roles.remove(role)
                                                    }, 2073600 * 1000);
                                                } else {
                                                    if (Math.floor(otherwarn + 1) == 2) {
                                                        message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                                        user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                                        user.roles.add(role)
                                                        setTimeout(function() {
                                                            user.roles.remove(role)
                                                        }, 604800 * 1000);
                                                    } else {
                                                        if (Math.floor(otherwarn + 1) == 1) {
                                                            message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                            user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                            user.roles.add(role)
                                                            setTimeout(function() {
                                                                user.roles.remove(role)
                                                            }, 86400 * 1000);
                                                        } 
                                                    }
                                                }
                                            }
                                        }
                                        con.query(sql, console.log())
                                    })
                                } else {
                                    if(args[1] === `6`) {
                                        con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                        con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                            if(err) throw err;
                                    
                                            let sql;
                                            
                                            if(rows.length < 1) {
                                                sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Spamming` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Spamming` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                            } else {
                                                let currentwarn = parseInt(rows[0].previouspunish)
                                                let otherwarn = parseInt(rows[0].spam)
                                                sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, spam = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Spamming` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Spamming` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                if (Math.floor(otherwarn + 1) >= 4) {
                                                    message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                                    user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                                    user.roles.add(role)
                                                    setTimeout(function() {
                                                        user.roles.remove(role)
                                                    }, 604800 * 1000);
                                                } else {
                                                    if (Math.floor(otherwarn + 1) == 3) {
                                                        message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                        user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                        user.roles.add(role)
                                                        setTimeout(function() {
                                                            user.roles.remove(role)
                                                        }, 86400 * 1000);
                                                    } else {
                                                        if (Math.floor(otherwarn + 1) == 2) {
                                                            message.channel.send(`<@${user.id}> has been auto-muted for 0d 1h 0m 0s`)
                                                            user.user.send(`You have been auto-muted for 0d 1h 0m 0s`)
                                                            user.roles.add(role)
                                                            setTimeout(function() {
                                                                user.roles.remove(role)
                                                            }, 3600 * 1000);
                                                        }
                                                    }
                                                }
                                            }
                                            con.query(sql, console.log())
                                        })
                                    } else {
                                            if(args[1] === `7`) {
                                                con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                    if(err) throw err;
                                            
                                                    let sql;
                                                    
                                                    if(rows.length < 1) {
                                                        sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `NSFW Content` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `NSFW Content` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                        message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                                        user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                                        user.roles.add(role)
                                                        setTimeout(function() {
                                                            user.roles.remove(role)
                                                        }, 604800 * 1000);
                                                    } else {
                                                        let currentwarn = parseInt(rows[0].previouspunish)
                                                        let otherwarn = parseInt(rows[0].nsfw)
                                                        sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, nsfw = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `NSFW Content` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `NSFW Content` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                        if (Math.floor(otherwarn + 1) >= 3) {
                                                            message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                                            user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                                            const targetMember = message.guild.members.cache.get(user.id)
                                                            setTimeout(function() {
                                                                targetMember.ban({reason: `Auto-ban`})
                                                            }, 1000)
                                                        } else {
                                                            if (Math.floor(otherwarn + 1) == 2) {
                                                                message.channel.send(`<@${user.id}> has been auto-muted for 24 0h 0m 0s`)
                                                                user.user.send(`You have been auto-muted for 24 0h 0m 0s`)
                                                                user.roles.add(role)
                                                                setTimeout(function() {
                                                                    user.roles.remove(role)
                                                                }, 2073600 * 1000);
                                                            } else {
                                                                message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                                                user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                                                user.roles.add(role)
                                                                setTimeout(function() {
                                                                    user.roles.remove(role)
                                                                }, 604800 * 1000);
                                                            }
                                                        }
                                                    }
                                                    con.query(sql, console.log())
                                                })
                                            } else {
                                                if(args[1] === `8`) {
                                                    con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                    con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                        if(err) throw err;
                                                
                                                        let sql;
                                                        
                                                        if(rows.length < 1) {
                                                            sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                                                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Begging for Roles/Nitro` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Begging for Roles/Nitro` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                        } else {
                                                            let currentwarn = parseInt(rows[0].previouspunish)
                                                            let otherwarn = parseInt(rows[0].begging)
                                                            sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, begging = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Begging for Roles/Nitro` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Begging for Roles/Nitro` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                            if (Math.floor(otherwarn + 1) >= 4) {
                                                                message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                                                user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                                                user.roles.add(role)
                                                                setTimeout(function() {
                                                                    user.roles.remove(role)
                                                                }, 604800 * 1000);
                                                            } else {
                                                                if (Math.floor(otherwarn + 1) == 3) {
                                                                    message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                                    user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                                    user.roles.add(role)
                                                                    setTimeout(function() {
                                                                        user.roles.remove(role)
                                                                    }, 86400 * 1000);
                                                                } else {
                                                                    if (Math.floor(otherwarn + 1) == 2) {
                                                                        message.channel.send(`<@${user.id}> has been auto-muted for 0d 1h 0m 0s`)
                                                                        user.user.send(`You have been auto-muted for 0d 1h 0m 0s`)
                                                                        user.roles.add(role)
                                                                        setTimeout(function() {
                                                                            user.roles.remove(role)
                                                                        }, 3600 * 1000);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        con.query(sql, console.log())
                                                    })
                                                } else {
                                                    if(args[1] === `9`) {
                                                        con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                        con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                            if(err) throw err;
                                                    
                                                            let sql;
                                                            
                                                            if(rows.length < 1) {
                                                                sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                                                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Maliciously Using Alts` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Maliciously Using Alts` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                            } else {
                                                                let currentwarn = parseInt(rows[0].previouspunish)
                                                                let otherwarn = parseInt(rows[0].malalts)
                                                                sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, malalts = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Maliciously Using Alts` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Maliciously Using Alts` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                            }
                                                            con.query(sql, console.log())
                                                        })
                                                    } else {
                                                        if(args[1] === `10`) {
                                                            con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                            con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                if(err) throw err;
                                                        
                                                                let sql;
                                                                
                                                                if(rows.length < 1) {
                                                                    sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0')`
                                                                    message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Normal Videos in Music Channel` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                    user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Normal Videos in Music Channel` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                } else {
                                                                    let currentwarn = parseInt(rows[0].previouspunish)
                                                                    let otherwarn = parseInt(rows[0].vidsmusic)
                                                                    sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, vidsmusic = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                    message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Normal Videos in Music Channel` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                    user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Normal Videos in Music Channel` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                    if (Math.floor(otherwarn + 1) >= 4) {
                                                                        message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                                                        user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                                                        user.roles.add(role)
                                                                        setTimeout(function() {
                                                                            user.roles.remove(role)
                                                                        }, 604800 * 1000);
                                                                    } else {
                                                                        if (Math.floor(otherwarn + 1) == 3) {
                                                                            message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                                            user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                                            user.roles.add(role)
                                                                            setTimeout(function() {
                                                                                user.roles.remove(role)
                                                                            }, 86400 * 1000);
                                                                        } else {
                                                                            if (Math.floor(otherwarn + 1) == 2) {
                                                                                message.channel.send(`<@${user.id}> has been auto-muted for 0d 1h 0m 0s`)
                                                                                user.user.send(`You have been auto-muted for 0d 1h 0m 0s`)
                                                                                user.roles.add(role)
                                                                                setTimeout(function() {
                                                                                    user.roles.remove(role)
                                                                                }, 3600 * 1000);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                con.query(sql, console.log())
                                                            })
                                                        } else {
                                                            if(args[1] === `11`) {
                                                                con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                                con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                    if(err) throw err;
                                                            
                                                                    let sql;
                                                                    
                                                                    if(rows.length < 1) {
                                                                        sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0', '0')`
                                                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Impersonation` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Impersonation` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                        message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                                                        user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                                                        const targetMember = message.guild.members.cache.get(user.id)
                                                                        setTimeout(function() {
                                                                            targetMember.ban({reason: `Auto-ban`})
                                                                        }, 1000)
                                                                    } else {
                                                                        let currentwarn = parseInt(rows[0].previouspunish)
                                                                        let otherwarn = parseInt(rows[0].impersonation)
                                                                        sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, impersonation = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Impersonation` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                        user.user.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Impersonation` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                        message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                                                        user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                                                        const targetMember = message.guild.members.cache.get(user.id)
                                                                        setTimeout(function() {
                                                                            targetMember.ban({reason: `Auto-ban`})
                                                                        }, 1000)
                                                                    }
                                                                    con.query(sql, console.log())
                                                                })
                                                            } else {
                                                                if(args[1] === `12`) {
                                                                    con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                                    con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                        if(err) throw err;
                                                                
                                                                        let sql;
                                                                        
                                                                        if(rows.length < 1) {
                                                                            sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '0')`
                                                                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Symbols in Username` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Symbols in Username` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                        } else {
                                                                            let currentwarn = parseInt(rows[0].previouspunish)
                                                                            let otherwarn = parseInt(rows[0].symbols)
                                                                            sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, symbols = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Symbols in Username` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Symbols in Username` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                        }
                                                                        con.query(sql, console.log())
                                                                    })
                                                                } else {
                                                                    if(args[1] === `13`) {
                                                                        con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                                        con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                            if(err) throw err;
                                                                    
                                                                            let sql;
                                                                            
                                                                            if(rows.length < 1) {
                                                                                sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0')`
                                                                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Leaking Personal Info` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Leaking Personal Info` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                                                                user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                                                                const targetMember = message.guild.members.cache.get(user.id)
                                                                                setTimeout(function() {
                                                                                    targetMember.ban({reason: `Auto-ban`})
                                                                                }, 1000)
                                                                            } else {
                                                                                let currentwarn = parseInt(rows[0].previouspunish)
                                                                                let otherwarn = parseInt(rows[0].personalinfo)
                                                                                sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, personalinfo = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Leaking Personal Info` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Leaking Personal Info` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                                                                user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                                                                const targetMember = message.guild.members.cache.get(user.id)
                                                                                setTimeout(function() {
                                                                                    targetMember.ban({reason: `Auto-ban`})
                                                                                }, 1000)
                                                                            }
                                                                            con.query(sql, console.log())
                                                                        })
                                                                    } else {
                                                                        if(args[1] === `14`) {
                                                                            con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                                            con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                                if(err) throw err;
                                                                        
                                                                                let sql;
                                                                                
                                                                                if(rows.length < 1) {
                                                                                    sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0')`
                                                                                    message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Spoiler Misuse` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                    user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Spoiler Misuse` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                    message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                                                    user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                                                    user.roles.add(role)
                                                                                    setTimeout(function() {
                                                                                        user.roles.remove(role)
                                                                                    }, 86400 * 1000);
                                                                                } else {
                                                                                    let currentwarn = parseInt(rows[0].previouspunish)
                                                                                    let otherwarn = parseInt(rows[0].spoilermisuse)
                                                                                    sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, spoilermisuse = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                                    message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Spoiler Misuse` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                    user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Spoiler Misuse` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                    if (Math.floor(otherwarn + 1) == 2) {
                                                                                        message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                                                                        user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                                                                        user.roles.add(role)
                                                                                        setTimeout(function() {
                                                                                            user.roles.remove(role)
                                                                                        }, 604800 * 1000);
                                                                                    } else {
                                                                                        message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                                                        user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                                                        user.roles.add(role)
                                                                                        setTimeout(function() {
                                                                                            user.roles.remove(role)
                                                                                        }, 86400 * 1000);
                                                                                    }
                                                                                }
                                                                                con.query(sql, console.log())
                                                                            })
                                                                        } else {
                                                                            if(args[1] === `15`) {
                                                                                con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                                                con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                                    if(err) throw err;
                                                                            
                                                                                    let sql;
                                                                                    
                                                                                    if(rows.length < 1) {
                                                                                        sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0')`
                                                                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Earrape/Voicechanger` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Earrape/Voicechanger` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                    } else {
                                                                                        let currentwarn = parseInt(rows[0].previouspunish)
                                                                                        let otherwarn = parseInt(rows[0].earrape)
                                                                                        sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, earrape = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Earrape/Voicechanger` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Earrape/Voicechanger` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                    }
                                                                                    con.query(sql, console.log())
                                                                                })
                                                                            } else {
                                                                                if(args[1] === `16`) {
                                                                                    con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                                                    con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                                        if(err) throw err;
                                                                                
                                                                                        let sql;
                                                                                        
                                                                                        if(rows.length < 1) {
                                                                                            sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0')`
                                                                                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Minimodding` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Minimodding` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                        } else {
                                                                                            let currentwarn = parseInt(rows[0].previouspunish)
                                                                                            let otherwarn = parseInt(rows[0].minimod)
                                                                                            sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, minimod = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Minimodding` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Minimodding` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                            if (Math.floor(otherwarn + 1) >= 4) {
                                                                                                message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                                                                                user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                                                                                user.roles.add(role)
                                                                                                setTimeout(function() {
                                                                                                    user.roles.remove(role)
                                                                                                }, 604800 * 1000);
                                                                                            } else {
                                                                                                if (Math.floor(otherwarn + 1) == 3) {
                                                                                                    message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                                                                    user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                                                                    user.roles.add(role)
                                                                                                    setTimeout(function() {
                                                                                                        user.roles.remove(role)
                                                                                                    }, 86400 * 1000);
                                                                                                } else {
                                                                                                    if (Math.floor(otherwarn + 1) == 2) {
                                                                                                        message.channel.send(`<@${user.id}> has been auto-muted for 0d 1h 0m 0s`)
                                                                                                        user.user.send(`You have been auto-muted for 0d 1h 0m 0s`)
                                                                                                        user.roles.add(role)
                                                                                                        setTimeout(function() {
                                                                                                            user.roles.remove(role)
                                                                                                        }, 3600 * 1000);
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        con.query(sql, console.log())
                                                                                    })
                                                                                } else {
                                                                                    if(args[1] === `17`) {
                                                                                        con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                                                        con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                                            if(err) throw err;
                                                                                    
                                                                                            let sql;
                                                                                            
                                                                                            if(rows.length < 1) {
                                                                                                sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0', '0')`
                                                                                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Interfering with moderators duties` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Interfering with moderators duties` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                            } else {
                                                                                                let currentwarn = parseInt(rows[0].previouspunish)
                                                                                                let otherwarn = parseInt(rows[0].interfere)
                                                                                                sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, interfere = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Interfering with moderators duties` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Interfering with moderators duties` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                                if (Math.floor(otherwarn + 1) >= 3) {
                                                                                                    message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                                                                    user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                                                                    user.roles.add(role)
                                                                                                    setTimeout(function() {
                                                                                                        user.roles.remove(role)
                                                                                                    }, 86400 * 1000);
                                                                                                } else {
                                                                                                    if (Math.floor(otherwarn + 1) == 2) {
                                                                                                        message.channel.send(`<@${user.id}> has been auto-muted for 0d 1h 0m 0s`)
                                                                                                        user.user.send(`You have been auto-muted for 0d 1h 0m 0s`)
                                                                                                        user.roles.add(role)
                                                                                                        setTimeout(function() {
                                                                                                            user.roles.remove(role)
                                                                                                        }, 3600 * 1000);
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                            con.query(sql, console.log())
                                                                                        })
                                                                                    } else {
                                                                                        if(args[1] === `18`) {
                                                                                            con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                                                            con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                                                if(err) throw err;
                                                                                        
                                                                                                let sql;
                                                                                                
                                                                                                if(rows.length < 1) {
                                                                                                    sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '0')`
                                                                                                    message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Pinging Owners` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                                    user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Pinging Owners` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                                } else {
                                                                                                    let currentwarn = parseInt(rows[0].previouspunish)
                                                                                                    let otherwarn = parseInt(rows[0].pingowners)
                                                                                                    sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, pingowners = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                                                    message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Pinging Owners` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                                    user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Pinging Owners` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                                    if (Math.floor(otherwarn + 1) >= 2) {
                                                                                                        message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                                                                        user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                                                                        user.roles.add(role)
                                                                                                        setTimeout(function() {
                                                                                                            user.roles.remove(role)
                                                                                                        }, 86400 * 1000);
                                                                                                    }
                                                                                                }
                                                                                                con.query(sql, console.log())
                                                                                            })
                                                                                        } else {
                                                                                            if(args[1] === `19`) {
                                                                                                con.query(`CREATE TABLE IF NOT EXISTS punishes (id TEXT, previouspunish TEXT, swearing TEXT, advertising TEXT, maliciouslinks TEXT, incorrectchannel TEXT, toxicity TEXT, spam TEXT, nsfw TEXT, begging TEXT, malalts TEXT, vidsmusic TEXT, impersonation TEXT, symbols TEXT, personalinfo TEXT, spoilermisuse TEXT, earrape TEXT, minimod TEXT, interfere TEXT, pingowners TEXT, modmailabuse TEXT)`)
                                                                                                con.query(`SELECT * FROM punishes WHERE id = '${user.id}'`, (err,rows) => {
                                                                                                    if(err) throw err;
                                                                                            
                                                                                                    let sql;
                                                                                                    
                                                                                                    if(rows.length < 1) {
                                                                                                        sql = `INSERT INTO punishes (id, previouspunish, swearing, advertising, maliciouslinks, incorrectchannel, toxicity, spam, nsfw, begging, malalts, vidsmusic, impersonation, symbols, personalinfo, spoilermisuse, earrape, minimod, interfere, pingowners, modmailabuse) VALUES ('${user.id}', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1')`
                                                                                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Modmail Abuse` + '``' + `.
They now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Modmail Abuse` + '``' + `.
You now have ` + '``1``' + ` warnings in this category, and ` + '``1``' + ` total warnings.`)
                                                                                                        message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                                                                                        user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                                                                                        const targetMember = message.guild.members.cache.get(user.id)
                                                                                                        setTimeout(function() {
                                                                                                            targetMember.ban({reason: `Auto-ban`})
                                                                                                        }, 1000)
                                                                                                    } else {
                                                                                                        let currentwarn = parseInt(rows[0].previouspunish)
                                                                                                        let otherwarn = parseInt(rows[0].modmailabuse)
                                                                                                        sql = `UPDATE punishes SET previouspunish = ${Math.floor(currentwarn + 1)}, modmailabuse = ${Math.floor(otherwarn + 1)} WHERE id = '${user.id}'`
                                                                                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Modmail Abuse` + '``' + `.
They now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Modmail Abuse` + '``' + `.
You now have ` + '``' + Math.floor(otherwarn + 1) + '``' + ` warnings in this category, and ` + '``' + Math.floor(currentwarn + 1) + '``' + ` total warnings.`)
                                                                                                        message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                                                                                        user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                                                                                        const targetMember = message.guild.members.cache.get(user.id)
                                                                                                        setTimeout(function() {
                                                                                                            targetMember.ban({reason: `Auto-ban`})
                                                                                                        }, 1000)
                                                                                                    }
                                                                                                    con.query(sql, console.log())
                                                                                                })
                                                                                            } else {
                                                                                                if (args[1].toLowerCase() === `low`) {
                                                                                                    message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Other (Low Severity)` + '``' + `.
They now have ` + '``N/A``' + ` warnings in this category, and ` + '``N/A``' + ` total warnings.`)
                                                                                                    user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Other (Low Severity)` + '``' + `.
You now have ` + '``N/A``' + ` warnings in this category, and ` + '``N/A``' + ` total warnings.`)
                                                                                                    message.channel.send(`<@${user.id}> has been auto-muted for 0d 1h 0m 0s`)
                                                                                                    user.user.send(`You have been auto-muted for 0d 1h 0m 0s`)
                                                                                                    user.roles.add(role)
                                                                                                    setTimeout(function() {
                                                                                                        user.roles.remove(role)
                                                                                                    }, 3600 * 1000);
                                                                                                } else {
                                                                                                    if(args[1].toLowerCase() === `medium`) {
                                                                                                        message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Other (Medium Severity)` + '``' + `.
They now have ` + '``N/A``' + ` warnings in this category, and ` + '``N/A``' + ` total warnings.`)
                                                                                                        user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Other (Medium Severity)` + '``' + `.
You now have ` + '``N/A``' + ` warnings in this category, and ` + '``N/A``' + ` total warnings.`)
                                                                                                        message.channel.send(`<@${user.id}> has been auto-muted for 1d 0h 0m 0s`)
                                                                                                        user.user.send(`You have been auto-muted for 1d 0h 0m 0s`)
                                                                                                        user.roles.add(role)
                                                                                                        setTimeout(function() {
                                                                                                            user.roles.remove(role)
                                                                                                        }, 86400 * 1000);
                                                                                                    } else {
                                                                                                        if(args[1].toLowerCase() === `high`) {
                                                                                                            message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Other (High Severity)` + '``' + `.
They now have ` + '``N/A``' + ` warnings in this category, and ` + '``N/A``' + ` total warnings.`)
                                                                                                            user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Other (High Severity)` + '``' + `.
You now have ` + '``N/A``' + ` warnings in this category, and ` + '``N/A``' + ` total warnings.`)
                                                                                                            message.channel.send(`<@${user.id}> has been auto-muted for 7d 0h 0m 0s`)
                                                                                                            user.user.send(`You have been auto-muted for 7d 0h 0m 0s`)
                                                                                                            user.roles.add(role)
                                                                                                            setTimeout(function() {
                                                                                                                user.roles.remove(role)
                                                                                                            }, 604800 * 1000);
                                                                                                        } else {
                                                                                                            if (args[1].toLowerCase() === `severe`) {
                                                                                                                message.channel.send(`<@${user.id}> has been warned by <@${member.id}> for ` + '``' + `Other (Severe Severity)` + '``' + `.
They now have ` + '``N/A``' + ` warnings in this category, and ` + '``N/A``' + ` total warnings.`)
                                                                                                                user.user.send(`You have been warned by <@${member.id}> for ` + '``' + `Other (Severe Severity)` + '``' + `.
You now have ` + '``N/A``' + ` warnings in this category, and ` + '``N/A``' + ` total warnings.`)
                                                                                                                message.channel.send(`<@${user.id}> has been auto-banned for Permanent`)
                                                                                                                user.user.send(`You have been auto-banned for Permanent
Appeal here: https://discord.gg/aKfcKs2RQg`)
                                                                                                                const targetMember = message.guild.members.cache.get(user.id)
                                                                                                                setTimeout(function() {
                                                                                                                    targetMember.ban({reason: `Auto-ban`})
                                                                                                                }, 1000)
                                                                                                            } else {
                                                                                                                message.channel.send("Please do a value between 1 and 19")
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } 
                            }
                        }
                    }
                    
                }
            } else {
                message.channel.send("Please type a user ID or mention a user.")
            }
        }
    }
}