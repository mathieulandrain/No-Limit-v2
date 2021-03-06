const Discord = require("discord.js");
const colours = require("../../assets/json/colours.json");

module.exports.run = async (bot, message, args) => {
  let aEmbed = new Discord.MessageEmbed()
    .setColor(colours.cyan)
    .setTitle("Serveur Info")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(`${message.guild.name} - Infos`, message.guild.iconURL())
    .addField("**Nom du serveur**", `${message.guild.name}`, true)
    .addField("**Propiétaire du serveur**", `${message.guild.owner}`, true)
    .addField(
      "**Nombre de membres**",
      `${
        message.guild.members.cache.filter((m) => !m.user.bot).size
      } membres et ${
        message.guild.members.cache.filter((m) => m.user.bot).size
      } bots`
    )
    .addField(
      "**Rôles**",
      `${message.guild.roles.cache.map((r) => `${r}`)}`,
      true
    )
    .setFooter(
      `No Limit - Serveur info `,
      bot.user.displayAvatarURL("png", true)
    );
  message.channel.send(aEmbed);
};

module.exports.help = {
  name: "servinfo",
  aliases: ["si"],
  category: "🚨 - moderation",
  description: "Connaître les infos du serveur",
  usage: "",
};
