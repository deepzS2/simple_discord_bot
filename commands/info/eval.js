const {
    RichEmbed
} = require("discord.js");
const beautify = require("beautify");

module.exports = {
    name: "eval",
    aliases: ["e"],
    description: "Evaluates the code you put in",
    usage: "<Code to eval>",
    run: async (bot, msg, args) => {
        if (msg.author.id !== "411557789068951552") {
            return msg.channel.send("You're not the owner of this bot!!").then(m => m.delete(5000));
        }

        if (!args[0]) {
            return msg.channel.send("You need to evaluate _**SOMETHING**_, please?").then(m => m.delete(5000));
        }

        try {
            if (args.join(" ").toLowerCase().includes("token")) {
                return;
            }

            const toEval = args.join(" ");
            const evaluated = eval(toEval);

            let embed = new RichEmbed()
                .setColor("#400040")
                .setTimestamp()
                .setFooter(bot.user.username, bot.user.displayAvatarURL)
                .setTitle("Eval")
                .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n \`\`\``)
                .addField("Evaluated:", evaluated)
                .addField("Type of:", typeof (evaluated));

            msg.channel.send(embed);
        } catch (e) {
            let embed = new RichEmbed()
                .setColor("#400040")
                .setTitle("\:x: Error!")
                .setDescription(e)
                .setFooter(bot.user.username, bot.user.displayAvatarURL)

            msg.channel.send(embed);
        }
    }
}