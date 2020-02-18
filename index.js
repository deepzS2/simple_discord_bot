const {
    Collection,
    Client
} = require("discord.js");

const bot = new Client({
    disableEveryone: true
});
const fs = require("fs");
require('dotenv/config');

bot.commands = new Collection();
bot.aliases = new Collection();

bot.categories = fs.readdirSync("./commands/");

["commands"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
})

// console chatter
let y = process.openStdin();
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g);
    bot.channels.get("623671092380172299").send(x.join(" "));
})

bot.on('guildMemberAdd', membro => {
    membro.send(`Seja bem vindo ${membro.user.tag}! Siga as regras do servidor e divirta-se`)
})

bot.on('message', async msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(process.env.PREFIX)) return;

    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase()

    if (comando.length === 0) return;

    let comandd = bot.commands.get(comando);
    if (!comandd) comandd = bot.commands.get(bot.aliases.get(comando));

    if (comandd)
        comandd.run(bot, msg, args);
})

bot.on("guildCreate", (guild) => {
    db.set(guild.id, []).write();
})

bot.once('ready', () => {
    console.log(`Bot online: ${bot.user.tag}! \n ${bot.users.size} usuários \n ${bot.channels.size} canais \n ${bot.guilds.size} servidores`)
	// Put an activity in the ""
    bot.user.setActivity("");
});

bot.once('reconnecting', () => {
    console.log('Reconnecting...');
});

bot.once('disconnect', () => {
    console.log('Disconnect!');
});

bot.login(process.env.TOKEN)