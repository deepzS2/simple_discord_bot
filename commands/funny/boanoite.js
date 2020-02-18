module.exports = {
    name: "boanoite",
    aliases: ["Boa noite", "Good night"],
    category: "funny",
    description: "Send good night / boa noite 😴zzzz",
    usage: "<@user>",
    run: async (bot, msg, args) => {
        let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
        if (!member) return msg.channel.send("Menciona alguém pra dar boa noite zzzszz");
        msg.delete().catch(O_o => {});
        msg.reply(`mandou um boa noite para ${member} :zzz: :sleeping:`);
    }
}