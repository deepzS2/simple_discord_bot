const fetch = require('node-fetch');
const {
    RichEmbed
} = require("discord.js");
const {
    stripIndents
} = require("common-tags");
const dateFormat = require('dateformat');


module.exports = {
    name: "steam",
    aliases: ["steaminfo", "steam"],
    category: "info",
    description: "Returns steam's user information",
    usage: "<user>",
    run: async (bot, msg, args) => {
        if (!args[0]) return msg.channel.send("Please provide an account name!");

        const token = "91069FF90E890B73D8415810876975AC";
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;
        // 76561198971561135

        fetch(url).then(res => res.json()).then(body => {
            if (body.response.success === 42) return msg.channel.send("I was unable to find a steam profile with that name");

            const id = body.response.steamid;
            const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
            const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
            const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];

            fetch(summaries).then(res => res.json()).then(body => {
                if (!body.response) return msg.channel.send("I was unable to find a steam profile with that name");

                const {
                    personaname,
                    avatarfull,
                    realname,
                    personastate,
                    loccountrycode,
                    profileurl,
                    timecreated
                } = body.response.players[0];

                fetch(bans).then(res => res.json()).then(body => {
                    if (!body.players) return msg.channel.send("I was unable to find a steam profile with that name");

                    const {
                        NumberOfVACBans,
                        NumberOfGameBans
                    } = body.players[0];

                    const embed = new RichEmbed()
                        .setColor("#400040")
                        .setAuthor(`Steam Services | ${personaname}`, avatarfull)
                        .setThumbnail(avatarfull)
                        .setDescription(stripIndents`**Real Name:** ${realname || "Unknown"}
                            **Status:** ${state[personastate]}
                            **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                            **Account Created:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                            **Bans:** Vac: ${NumberOfVACBans || "0"}, Game: ${NumberOfGameBans}
                            **Link:** [link to profile](${profileurl})`)
                        .setTimestamp();

                    msg.channel.send(embed);
                })
            })
        });
    }
}