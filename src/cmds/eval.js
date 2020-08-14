module.exports = {
    name: "eval",
    alias: ["e"],
    category: "Development",
    description: "Development command.",
    cooldown: 3,
    run: async (client, message, args) => {

        const Discord = require("discord.js");

        if (!client.config.devs.includes(message.author.id)) return;

        if (!args[0]) return message.channel.send(`What you want to evaluate, ${message.member}?`);
        
        let limit = 1005;
        
        let code = args.join(" ");

        const tokenEmbed = new Discord.MessageEmbed()
            .setAuthor("Evaluation done!", client.user.displayAvatarURL({ format: "png", size: 4096 }))
            .addField("Type", `\`\`\`prolog\nIdk\n\`\`\``, true)
            .addField("Evaluated by", `\`\`\`yaml\n${message.author.username}\n\`\`\``, true)
            .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
            .addField("Output", `\`\`\`js\nWhy are you doing this? u.u\n\`\`\``)
            .setColor("RED")
            .setTimestamp();

        if(code.includes("client.token")) return message.channel.send(tokenEmbed);

        try {

            let evalued = await eval("(async() => { "+ code +" })()");
            const typeTxt = typeof(evalued);
            const typeSplit = typeTxt.split("");
            const type = `${typeSplit[0].toUpperCase()}${typeSplit.slice(1).join("")}`;
            if (typeof evalued !== "string") evalued = require("util").inspect(evalued, { depth: 0, showHidden: true });
            
            let txt = ""+evalued;
          
        if(txt.length >= limit) {

        const embed = new Discord.MessageEmbed()
            .setAuthor("Evaluation done!", client.user.displayAvatarURL({ format: "png", size: 4096 }))
            .addField("Type", `\`\`\`prolog\n${type}\n\`\`\``, true)
            .addField("Evaluated by", `\`\`\`yaml\n${message.author.username}\n\`\`\``, true)
            .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
            .addField("Output", `\`\`\`js\n${txt.replace(client.token, "What are you doing watching this? xD").slice(0, limit)}\n\`\`\``)
            .setColor("GREEN")
            .setTimestamp();

        if(!code.includes("return")) embed.setDescription("Remember that you need to put **`return`** to return the output.")
        
        message.channel.send(embed);
          
        } else {
        
        const embed = new Discord.MessageEmbed()
            .setAuthor("Evaluation done!", client.user.displayAvatarURL({ format: "png", size: 4096 }))
            .addField("Type", `\`\`\`prolog\n${type}\n\`\`\``, true)
            .addField("Evaluated by", `\`\`\`yaml\n${message.author.username}\n\`\`\``, true)
            .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
            .addField("Output", `\`\`\`js\n${type.toLowerCase() == "undefined" || txt.length < 1 ? "Without output." : txt.replace(client.token, "What are you doing watching this? xD")}\n\`\`\``)
            .setColor("GREEN")
            .setTimestamp();

        if(!code.includes("return")) embed.setDescription("Remember that you need to put **`return`** to return the output.")
        
        message.channel.send(embed);
        
            }
        
        } catch (err) {

        const embed = new Discord.MessageEmbed()
            .setAuthor("An error was occurred!", client.user.displayAvatarURL({ format: "png", size: 4096 }))
            .addField("Type", `\`\`\`prolog\n${err.name}\n\`\`\``, true)
            .addField("Evaluated by", `\`\`\`yaml\n${message.author.username}\n\`\`\``, true)
            .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
            .addField("Output", `\`\`\`js\n${err.message.length < 1 ? "Without output." : err.message.replace(client.token, "What are you doing watching this?")}\n\`\`\``)
            .setColor("RED")
            .setFooter(`Evaluated by: ${message.author.tag}`);
 
        message.channel.send(embed);

        }
      }
    }