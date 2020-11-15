const { MessageReaction } = require("discord.js");

module.exports = {
    name: ">prefix",
    category: "info",
    description: "Gives prefix",
    run: async (bot, message, args) => {
        const { member, mentions } = message
        if(message.guild.id === `774806096019324938`) {
            let owner = message.guild.roles.cache.find(r => r.name === "Owner");
            let sysadmin = message.guild.roles.cache.find(r => r.name === "SysAdmin");
            let manager = message.guild.roles.cache.find(r => r.name === "Manager");
            let admin = message.guild.roles.cache.find(r => r.name === "Admin");
            let developer = message.guild.roles.cache.find(r => r.name === "Developer");
            let jrdev = message.guild.roles.cache.find(r => r.name === "Jr. Dev");
            let youtuber = message.guild.roles.cache.find(r => r.name === "Youtuber");
            let srmod = message.guild.roles.cache.find(r => r.name === "Senior Moderator");
            let mod = message.guild.roles.cache.find(r => r.name === "Moderator");
            let helper = message.guild.roles.cache.find(r => r.name === "Helper");
            let mvp = message.guild.roles.cache.find(r => r.name === "MVP");
            let emerald = message.guild.roles.cache.find(r => r.name === "Emerald");
            let netherite = message.guild.roles.cache.find(r => r.name === "Netherite");
            let diamond = message.guild.roles.cache.find(r => r.name === "Diamond");
            let gold = message.guild.roles.cache.find(r => r.name === "Gold");
            let iron = message.guild.roles.cache.find(r => r.name === "Iron");
            let coal = message.guild.roles.cache.find(r => r.name === "Coal");
            if(!args[0]) {
                if (message.member.roles.cache.has(owner.id)) {
                    message.channel.send("Set your prefix to Owner " + message.author.username.toString())
                    message.member.setNickname("Owner " + message.author.username.toString())
                } else {
                    if (message.member.roles.cache.has(sysadmin.id)) {
                        message.channel.send("Set your prefix to SysAdmin " + message.author.username.toString())
                        message.member.setNickname("SysAdmin " + message.author.username.toString())
                    } else {
                        if (message.member.roles.cache.has(manager.id)) {
                            message.channel.send("Set your prefix to Manager " + message.author.username.toString())
                            message.member.setNickname("Manager " + message.author.username.toString())
                        } else {
                            if (message.member.roles.cache.has(admin.id)) {
                                message.channel.send("Set your prefix to Admin " + message.author.username.toString())
                                message.member.setNickname("Admin " + message.author.username.toString())
                            } else {
                                if (message.member.roles.cache.has(developer.id)) {
                                    message.channel.send("Set your prefix to Dev " + message.author.username.toString())
                                    message.member.setNickname("Dev " + message.author.username.toString())
                                } else {
                                    if (message.member.roles.cache.has(jrdev.id)) {
                                        message.channel.send("Set your prefix to JrDev " + message.author.username.toString())
                                        message.member.setNickname("JrDev " + message.author.username.toString())
                                    } else {
                                        if (message.member.roles.cache.has(youtuber.id)) {
                                            message.channel.send("Set your prefix to YT " + message.author.username.toString())
                                            message.member.setNickname("YT " + message.author.username.toString())
                                        } else {
                                            if (message.member.roles.cache.has(srmod.id)) {
                                                message.channel.send("Set your prefix to SrMod " + message.author.username.toString())
                                                message.member.setNickname("SrMod " + message.author.username.toString())
                                            } else {
                                                if (message.member.roles.cache.has(mod.id)) {
                                                    message.channel.send("Set your prefix to Mod " + message.author.username.toString())
                                                    message.member.setNickname("Mod " + message.author.username.toString())
                                                } else {
                                                    if (message.member.roles.cache.has(helper.id)) {
                                                        message.channel.send("Set your prefix to Helper " + message.author.username.toString())
                                                        message.member.setNickname("Helper " + message.author.username.toString())
                                                    } else {
                                                        if (message.member.roles.cache.has(mvp.id)) {
                                                            message.channel.send("Set your prefix to [MVP] " + message.author.username.toString())
                                                            message.member.setNickname("[MVP] " + message.author.username.toString())
                                                        } else {
                                                            if (message.member.roles.cache.has(emerald.id)) {
                                                                message.channel.send("Set your prefix to [Emerald] " + message.author.username.toString())
                                                                message.member.setNickname("[Emerald] " + message.author.username.toString())
                                                            } else {
                                                                if (message.member.roles.cache.has(netherite.id)) {
                                                                    message.channel.send("Set your prefix to [Netherite] " + message.author.username.toString())
                                                                    message.member.setNickname("[Netherite] " + message.author.username.toString())
                                                                } else {
                                                                    if (message.member.roles.cache.has(diamond.id)) {
                                                                        message.channel.send("Set your prefix to [Diamond] " + message.author.username.toString())
                                                                        message.member.setNickname("[Diamond] " + message.author.username.toString())
                                                                    } else {
                                                                        if (message.member.roles.cache.has(gold.id)) {
                                                                            message.channel.send("Set your prefix to [Gold] " + message.author.username.toString())
                                                                            message.member.setNickname("[Gold] " + message.author.username.toString())
                                                                        } else {
                                                                            if (message.member.roles.cache.has(iron.id)) {
                                                                                message.channel.send("Set your prefix to [Iron] " + message.author.username.toString())
                                                                                message.member.setNickname("[Iron] " + message.author.username.toString())
                                                                            } else {
                                                                                if (message.member.roles.cache.has(coal.id)) {
                                                                                    message.channel.send("Set your prefix to [Coal] " + message.author.username.toString())
                                                                                    message.member.setNickname("[Coal] " + message.author.username.toString())
                                                                                } else {
                                                                                    message.channel.send("You are a default, therefore clearing your prefix.")
                                                                                    message.member.setNickname(message.author.username.toString())
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
                let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
                if(user) {
                    if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
                        if (user.roles.cache.has(owner.id)) {
                            message.channel.send("Set <@!" + user.id + ">'s prefix to Owner " + user.user.username.toString())
                            user.setNickname("Owner " + user.user.username.toString())
                        } else {
                            if (user.roles.cache.has(sysadmin.id)) {
                                message.channel.send("Set <@!" + user.id + ">'s prefix to SysAdmin " + user.user.username.toString())
                                user.setNickname("SysAdmin " + user.user.username.toString())
                            } else {
                                if (user.roles.cache.has(manager.id)) {
                                    message.channel.send("Set <@!" + user.id + ">'s prefix to Manager " + user.user.username.toString())
                                    user.setNickname("Manager " + user.user.username.toString())
                                } else {
                                    if (user.roles.cache.has(admin.id)) {
                                        message.channel.send("Set <@!" + user.id + ">'s prefix to Admin " + user.user.username.toString())
                                        user.setNickname("Admin " + user.user.username.toString())
                                    } else {
                                        if (user.roles.cache.has(developer.id)) {
                                            message.channel.send("Set <@!" + user.id + ">'s prefix to Dev " + user.user.username.toString())
                                            user.setNickname("Dev " + user.user.username.toString())
                                        } else {
                                            if (user.roles.cache.has(jrdev.id)) {
                                                message.channel.send("Set <@!" + user.id + ">'s prefix to JrDev " + user.user.username.toString())
                                                user.setNickname("JrDev " + user.user.username.toString())
                                            } else {
                                                if (user.roles.cache.has(youtuber.id)) {
                                                    message.channel.send("Set <@!" + user.id + ">'s prefix to YT " + user.user.username.toString())
                                                    user.setNickname("YT " + user.user.username.toString())
                                                } else {
                                                    if (user.roles.cache.has(srmod.id)) {
                                                        message.channel.send("Set <@!" + user.id + ">'s prefix to SrMod " + user.user.username.toString())
                                                        user.setNickname("SrMod " + user.user.username.toString())
                                                    } else {
                                                        if (user.roles.cache.has(mod.id)) {
                                                            message.channel.send("Set <@!" + user.id + ">'s prefix to Mod " + user.user.username.toString())
                                                            user.setNickname("Mod " + user.user.username.toString())
                                                        } else {
                                                            if (user.roles.cache.has(helper.id)) {
                                                                message.channel.send("Set <@!" + user.id + ">'s prefix to Helper " + user.user.username.toString())
                                                                user.setNickname("Helper " + user.user.username.toString())
                                                            } else {
                                                                if (user.roles.cache.has(mvp.id)) {
                                                                    message.channel.send("Set <@!" + user.id + ">'s prefix to [MVP] " + user.user.username.toString())
                                                                    user.setNickname("[MVP] " + user.user.username.toString())
                                                                } else {
                                                                    if (user.roles.cache.has(emerald.id)) {
                                                                        message.channel.send("Set <@!" + user.id + ">'s prefix to [Emerald] " + user.user.username.toString())
                                                                        user.setNickname("[Emerald] " + user.user.username.toString())
                                                                    } else {
                                                                        if (user.roles.cache.has(netherite.id)) {
                                                                            message.channel.send("Set <@!" + user.id + ">'s prefix to [Netherite] " + user.user.username.toString())
                                                                            user.setNickname("[Netherite] " + user.user.username.toString())
                                                                        } else {
                                                                            if (user.roles.cache.has(diamond.id)) {
                                                                                message.channel.send("Set <@!" + user.id + ">'s prefix to [Diamond] " + user.user.username.toString())
                                                                                user.setNickname("[Diamond] " + user.user.username.toString())
                                                                            } else {
                                                                                if (user.roles.cache.has(gold.id)) {
                                                                                    message.channel.send("Set <@!" + user.id + ">'s prefix to [Gold] " + user.user.username.toString())
                                                                                    user.setNickname("[Gold] " + user.user.username.toString())
                                                                                } else {
                                                                                    if (user.roles.cache.has(iron.id)) {
                                                                                        message.channel.send("Set <@!" + user.id + ">'s prefix to [Iron] " + user.user.username.toString())
                                                                                        user.setNickname("[Iron] " + user.user.username.toString())
                                                                                    } else {
                                                                                        if (user.roles.cache.has(coal.id)) {
                                                                                            message.channel.send("Set <@!" + user.id + ">'s prefix to [Coal] " + user.user.username.toString())
                                                                                            user.setNickname("[Coal] " + user.user.username.toString())
                                                                                        } else {
                                                                                            message.channel.send("<@!" + user.id + "> is a default, therefore clearing their prefix.")
                                                                                            user.setNickname(user.user.username.toString())
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
                    message.channel.send("Please mention a user or type an ID.")
                }
            }
        } else {
            message.channel.send("<@" + member.id + ">, you can't use this command in ``" + message.guild.name + " server!``, This command requires to be used in ``Dan's MC Hangout``.")
        }
    }
}