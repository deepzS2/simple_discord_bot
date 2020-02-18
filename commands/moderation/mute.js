module.exports = {
    name: "mute",
    category: "moderation",
    description: "Mutes a member in the discord!",
    usage: "<@user> <reason>",
    run: async (bot, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_ROLES") || !msg.guild.owner) return msg.channel.send("You don't have permission to use this command");

        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send("I don't have permission to add roles!");

        let mutee = msg.mentions.members.first() || msg.guild.members.get(args[0]);
        if (!mutee) return msg.channel.send("Please supply a user to be muted!");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "no reason";

        let muterole = msg.guild.roles.find(r => r.name === "Muted");
        let member_role = msg.guild.roles.find(r => r.id === "609946063864070144");

        if (!muterole) {
            try {
                muterole = await msg.guild.createRole({
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                });

                muterole = msg.guild.roles.find(r => r.name === "Muted");

                msg.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                });
            } catch (e) {
                console.log(e.stack);
            }
        }

        mutee.removeRole(member_role).then(console.log("Ok")).catch(console.error);

        mutee.addRole(muterole.id).then(() => {
            msg.delete();
            mutee.send(`Muted for ${reason} lol`);
            msg.channel.send(`${mutee.user.username} was successfully muted`);
        });
    }
}