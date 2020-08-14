module.exports = {
    name: "message",
    event: (client, message) => {

        const Discord = require("discord.js");

        let prefix = "s!";

        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;

        const cooldowns = client.cooldowns;

        const args = message.content.slice(prefix.length).trim().split(/ /g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.alias && cmd.alias.includes(command));

        if(!cmd) return;

        if(!cooldowns.has(cmd.name)) {
            cooldowns.set(cmd.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(cmd.name);
        const cooldownAmount = cmd.cooldown * 1000;

        if(timestamps.has(message.author.id)){
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if(now < expirationTime){
                const timeLeft = (expirationTime - now) / 1000;
                return message.channel.send(`Hey, ${message.member}! You must wait **${timeLeft.toFixed(1)} seconds** before using the command **\`${cmd.name}\`**.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try{
            cmd.run(client, message, args);
        } catch(error) {
            console.log(`An error was occurred while the user ${message.author.tag}(${message.author.id}) tryied to use the command ${command}(${cmd.name}) in the server ${message.guild.name}(${message.guild.id}).\n${error}`);
        }

    }
}