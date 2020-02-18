module.exports = {
    name: "bomdia",
    category: "funny",
    description: "Send good morning / bom dia ☀",
    usage: ".bomdia <@user>",
    run: async (bot, msg, args) => {
        msg.delete().catch(O_o => {})
        let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
        if (!member) return msg.channel.send("Menciona alguém pra dar bom dia");
        msg.reply(`mandou um bom dia para ${member}`);
    }
}