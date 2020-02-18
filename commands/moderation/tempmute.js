const ms = require("ms");

module.exports = {
  name: "tempmute",
  aliases: ["Temporarily mute"],
  category: "moderation",
  description: "Temporarily mutes a member in the discord!",
  usage: "<@user> <reason> <time>",
  run: async (bot, msg, args) => {
    if (!msg.member.hasPermission("MANAGE_ROLES") || !msg.guild.owner)
      return msg.channel.send("You don't have permission to use this command");

    if (!msg.guild.me.hasPermission("MANAGE_ROLES"))
      return msg.channel.send("I don't have permission to add roles!");

    let mutee = msg.mentions.members.first() || msg.guild.members.get(args[0]);
    if (!mutee) return msg.channel.send("Please supply a user to be muted!");

    let reason = args.slice(2).join(" ");
    if (!reason) reason = "no reason";

    let time = args[1];
    if (!time) return msg.channel.send("Please specify a time");

    let muterole = msg.guild.roles.find(r => r.name === "Muted");
    if (!muterole) {
      try {
        muterole = await msg.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions: []
        });

        msg.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }

    mutee
      .removeRoles(mutee.roles)
      .then(console.log)
      .catch(console.error);

    mutee.addRole(muterole.id).then(() => {
      msg.delete();
      mutee.send(`Muted for ${reason} lol`);
      msg.channel.send(
        `${mutee.user.username} was successfully muted for ${ms(ms(mutetime))}`
      );
    });

    setTimeout(function () {
      mutee
        .removeRoles(muterole.id)
        .then(console.log)
        .catch(console.error);

      mutee.addRole(mutee.roles).then(() => {
        msg.channel.send(
          `${mutee.user.username} you have been muted by ${time} lol`
        );
      });
    }, ms(time));
  }
};