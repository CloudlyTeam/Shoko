module.exports = {
    name: "ping",
    alias: ["latency"],
    run: (client, message) =>{

        const pingAPI = Math.floor(client.ws.ping);
        const messagePing = Math.floor(Date.now() - message.createdTimestamp);

        message.channel.send(`[🛰️] | Discord API: ${pingAPI}ms\n[📨] | Messages ping: ${messagePing}ms`);
        
    }
}