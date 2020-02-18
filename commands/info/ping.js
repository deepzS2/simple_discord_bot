module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (bot, msg, args) => {
        const m = await msg.channel.send(`🏓 Pinging....`);
        m.edit(`🏓 Pong!\nLatency is ${m.createdTimestamp - msg.createdTimestamp}ms\nAPI Latency is ${Math.round(bot.ping)}ms`);
    }
}