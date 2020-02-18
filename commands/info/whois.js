const {
    getMember
} = require("../../functions.js");
const {
    RichEmbed
} = require("discord.js");
const {
    stripIndents
} = require("common-tags");


module.exports = {
    name: "whois",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    description: "Returns user information",
    usage: "<@user>",
    run: async (bot, msg, args) => {
        if (!args[0]) return msg.channel.send("Please provide an user");

        const member = getMember(msg, args.join(" "));

        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== msg.guild.id)
            .map(r => r.name)
            .join(", ") || "none";

        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor("#400040")
            .addField("Member information:", stripIndents`**>** **Display name:** ${member.displayName}
            **>** **Joined at:** ${joined}
            **>** **Roles:** ${roles}`, true)
            .addField('User information: ', stripIndents`**>** **ID:** ${member.user.id}
            **>** **Username:** ${member.user.username}
            **>** **Discord Tag:** ${member.user.tag}
            **>** **Created at:** ${created}`, true)
            .setTimestamp()

        if (member.user.presence.game)
            embed.addField('Currentry playing', `**>** **Name:** ${member.user.presence.game.name}`);

        msg.channel.send(embed);
    }
}