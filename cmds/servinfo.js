const Discord = require("discord.js");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
  let aEmbed = new Discord.MessageEmbed()
    .setColor(colours.cyan)
    .setTitle("Serveur Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} - Infos`, message.guild.iconURL)
    .addField("**Nom du serveur**", `${message.guild.name}`, true)
    .addField("**Propiétaire du serveur**", `${message.guild.owner}`, true)
    .addField("**Nombre de membres**", `${message.guild.memberCount}`)
    .addField("**Nombre de rôles**", `${message.guild.roles.size}`, true)
    .setFooter(`No Limit `, bot.user.displayAvatarURL);
  message.channel.send(aEmbed);
};

module.exports.help = {
  name: "servinfo",
};
