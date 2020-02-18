const SteamAPI = require("steamapi");
const steam = new SteamAPI("91069FF90E890B73D8415810876975AC");
const BigInteger = require("big-integer");

var STEAM_BASELINE = "76561197960265728";

module.exports = {
  name: "profile",
  aliases: ["Steam ID", "Profile ID"],
  category: "info",
  description: "Returns steamid from steamurl",
  usage: "<SteamURL>",
  run: async (bot, msg, args) => {
    const guild = bot.guilds.get("609938540196790314");
    if (guild && guild.channels.get("648501239587405829")) {
      if (
        msg.member.roles.find(
          r => r.id == "609938693435818006" || r.id == "609939882835705856"
        )
      ) {
        steam.resolve(args[0]).then(id => {
          steam.getUserSummary(id).then(summary => {
            steamid = ConvertToLegacy(summary.steamID);
            if (summary.gameServerIP == undefined) {
              guild.channels
                .get("648501239587405829")
                .send(
                  `SteamID: ${steamid}\nGameServerSteamID: ${summary.gameServerSteamID}`
                );
            } else if (summary.gameServerSteamID == undefined) {
              guild.channels
                .get("648501239587405829")
                .send(
                  `SteamID: ${steamid}\nGameServerIP: ${summary.gameServerIP}`
                );
            } else {
              guild.channels
                .get("648501239587405829")
                .send(`SteamID: ${steamid}`);
            }
          });
        });
      }
    }
  }
};

function ConvertToLegacy(inputID) {
  var output = "unknown";

  // From packed
  if (inputID.match(/^765/) && inputID.length > 15) {
    var z = BigInteger(BigInteger(inputID).subtract(STEAM_BASELINE)).divide(2);
    var y = BigInteger(inputID).remainder(2);
    output = "STEAM_0:" + y.toString() + ":" + z.toString();
  }

  return output;
}