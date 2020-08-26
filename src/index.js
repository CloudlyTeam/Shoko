const Discord = require("discord.js");
const client = new Discord.Client({ 
    allowedMentions: { parse: [] }, 
    ws: { properties: { $browser: "Discord Android" } }, 
    partials: ["MESSAGE", "REACTION", "CHANNEL", "USER", "GUILD_MEMBER"], 
    intents: Discord.Intents.ALL,
    presence: {
        status: "online",
        activity: {
            name: "with you n.n/",
            type: "PLAYING"
        }
    } 
});

client.config = require("../config.js");

const fs = require("fs");

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

fs.readdirSync("./cmds/").filter((file) => file.endsWith(".js")).forEach((file) => {
    const fileData = require(`./cmds/${file}`);
    client.commands.set(fileData.name, fileData);
    console.log(`[COMMAND HANDLER] | Command ${file} loaded.`)
});

fs.readdirSync("./events/").filter((file) => file.endsWith(".js")).forEach((file) => {
    const fileData = require(`./events/${file}`);
    client.on(fileData.name, fileData.event.bind(null, client));
    console.log(`[EVENT HANDLER] | Event ${file} loaded.`)
    delete require.cache[require.resolve(`./events/${file}`)];
});

client.login(client.config.token);
