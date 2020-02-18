const {
    RichEmbed
} = require("discord.js");
const {
    stripIndents
} = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: (bot, msg, args) => {
        if (args[0]) {
            return getCMD(bot, msg, args[0]);
        } else {
            return getAll(bot, msg);
        }
    }
}

function getAll(bot, msg) {
    const embed = new RichEmbed()
        .setColor("#400040");

    const commands = (category) => {
        return bot.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `.\`${cmd.name}\``)
            .join("\n")
    }

    const info = bot.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n ${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return msg.channel.send(embed.setDescription(info));
}

function getCMD(bot, msg, input) {
    const embed = new RichEmbed();

    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));

    let info = `No information found for commands **${input.toLowerCase()}**`;

    if (!cmd) {
        return msg.channel.send(embed.setColor("#400040").setDescription(info));
    }

    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`
    if (cmd.description) info += `\n**Description**: ${cmd.description}`
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return msg.channel.send(embed.setColor("#400040").setDescription(info));
}