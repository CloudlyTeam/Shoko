module.exports = {
	name: "info",
	alias: ["botinfo", "botstats", "bothelp"],
	run: async (client, message, args) => {

		const Discord = require("discord.js");
		const moment = require("moment")
		require('moment-duration-format');
		const os = require('os');
		const cpuStat = require("cpu-stat");
		const version = "1.3.2 beta";

		const uptime = moment.duration(client.uptime).format("D [day], H [hour], m [minute], s [second]");

		const osplatform = os.platform().toString().split("");
		const platform = osplatform[0].toUpperCase()+osplatform.slice(1).join("");

		cpuStat.usagePercent((err, percent) => {

		const infoEmbed = new Discord.MessageEmbed()
		.setColor("#fffff")
		.setThumbnail(client.user.displayAvatarURL({ format: "png", size: 4096 }))
		.setDescription(`Hello **${message.member.displayName}**! I'm Shoko, a bot created to help in the moderation and fun of your server. Here you have more information about me!`)
		.addField("Created by", `> Cloudly Development Team`, true)
		.addField("Version", `> ${version}`, true)
		.addField("\u200b", "\u200b", true)
		.addField("Library",  `> Discord.js ^${Discord.version}`, true)
		.addField("Uptime", `> ${uptime}`, true)
		.addField("\u200b", "\u200b", true)
	    .addField(`CPU`, `> ${os.cpus().map(i => `${i.model}`)[0]}`, true)
		.addField("CPU use", `> ${percent.toFixed(2)}%`, true)
		.addField("\u200b", "\u200b", true)
		.addField("Architecture", `> ${os.arch()}`, true)
		.addField("Platform", `> ${platform}`, true)
		.addField("\u200b", "\u200b", true)
	    .addField("Memory used", `> ${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)}MB`, true)
	    .addField("Node version", `> Node.js ^${process.version}`, true)
		.addField("\u200b", "\u200b", true)
		.addField("Guilds", `> ${client.guilds.cache.size}`, true)
		.addField("Users", `> ${client.users.cache.size}`, true)
		.addField("\u200b", "\u200b", true)
		.addField("Emojis", `> ${client.emojis.cache.size}`, true)
		.addField("Roles", `> ${client.guilds.cache.map((x) => x.roles.cache.size).reduce((a, b) => a + b)}`, true)
		.addField("\u200b", "\u200b", true)
		.addField("Created", `> ${client.user.createdAt.toLocaleDateString()}\n> (${days(client.user.createdAt)})`, true)
		.addField("Joined this server", `> ${message.guild.me.joinedAt.toLocaleDateString()}\n> (${days(message.guild.me.joinedAt)})`, true)
		.addField("\u200b", "\u200b", true)

		message.channel.send(infoEmbed);

	})

  function days(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let dias = Math.floor(diff / 86400000);
        return `**${dias == 0 ? "Today" : dias.toLocaleString() + (dias == 1 ? " day ago" : " days ago")}**`
    };


	}
}