const {
    RichEmbed
} = require("discord.js");
const {
    getMember
} = require("../../functions.js");

module.exports = {
    name: "love",
    aliases: ["affinity"],
    category: "funny",
    description: "Calculate the love affinity you have for another person.",
    usage: "[@user]",
    run: async (bot, msg, args) => {
        let person = getMember(msg, args[0]);

        let love = Math.random() * 100;

        if (!person || msg.author.id === person.id) {
            person = msg.guild.members.filter(m => m.id !== msg.author.id).random();
        }

        if (person.id == "241381649433100288" && msg.author.id == "347163186212110338") {
            love = 99
        } else if (msg.author.id == "322813965153468416" && person.id == "241381649433100288"){
            love = 94
        } else if (msg.author.id == "347163186212110338" && person.id == "322813965153468416") {
            love = 99
        } 

        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new RichEmbed()
            .setColor("#400040")
            .addField(`☁ **${person.displayName}** loves **${msg.member.displayName}** this much:`, `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
            .setThumbnail(person.user.displayAvatarURL);

        msg.channel.send(embed);
    }
}