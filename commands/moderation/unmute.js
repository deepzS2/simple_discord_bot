module.exports = {
    name: "unmute",
    category: "moderation",
    description: "Unmutes a member in the discord!",
    usage: "<@user> <reason>",
    run: async (bot, msg, args) => {
        if (!msg.member.hasPermission("MANAGE_ROLES") || !msg.guild.owner) return msg.channel.send("You don't have permission to use this command");

        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send("I don't have permission to remove roles!");

        let unmutee = msg.mentions.members.first() || msg.guild.members.get(args[0]);
        if (!unmutee) return msg.channel.send("Please supply a user to be unmuted!");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "no reason";

        let muterole = msg.guild.roles.find(r => r.name === "Muted");
        if (!muterole) return msg.channel.send("There is no mute role to remove!");

        unmutee.removeRole(muterole.id).then(() => {
            msg.delete();
            unmutee.send(`Unmuted for ${reason} lol`).catch(err => console.log(err));
            msg.channel.send(`${unmutee.user.username} was unmuted!`);
        });

        let member_role = msg.guild.roles.find(r => r.id === "609946063864070144");

        unmutee.addRole(member_role).then(() => {
            console.log("Ok");
        }).catch(console.error);
    }
}