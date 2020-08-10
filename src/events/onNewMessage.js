module.exports = {
    name: "message",
    event: (client, message) => {

        let prefix = "s!";

        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ /g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.alias && cmd.alias.includes(command));

        if(!cmd) return;

        try{
            cmd.run(client, message, args);
        } catch(error) {
            console.log(`An error was occurred while the user ${message.author.tag}(${message.author.id}) tryied to use the command ${command}(${cmd.name}) in the server ${message.guild.name}(${message.guild.id}).\n${error}`);
        }

    }
}