module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Clears the chat",
    run: async (bot, msg, args) => {
        if (msg.deletable) {
            msg.delete();
        }

        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
            return msg.reply("You can't delete messages😴").then(m => m.delete(5000));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return msg.reply("Yeah... No number? I also can't delete 0 messages btw").then(m => m.delete(5000));
        }

        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return msg.reply("Srry... I can't delete messages").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        const fetched = await msg.channel.fetchMessages({ limit: deleteAmount });

        msg.channel.bulkDelete(fetched, true)
            .then(deleted => msg.channel.send(`I deleted \`${deleted.size}\` messages.`))
            .catch(err => msg.reply(`Something went wrong... ${err}`));
    }
}