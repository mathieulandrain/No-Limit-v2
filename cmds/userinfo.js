const Discord = require("discord.js");
const colours = require("../colours.json");
const moment = require("moment");
moment.locale("fr");

module.exports.run = async (bot, message, args) => {
  let zEmbed = new Discord.RichEmbed()
    .setColor(colours.cyan)
    .setTitle("Infos de l'utilisateur")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(
      `${message.author.username} - Infos`,
      message.author.displayAvatarURL
    )
    .addField("**Nom de l'utilisateur**", `${message.author.username}`, true)
    .addField("**#**", `${message.author.discriminator}`, true)
    .addField("**ID**", `${message.author.id}`)
    .addField("**Status**", `${message.author.presence.status}`, true)
    .addField(
      "**Crée le :**",
      moment.utc(message.author.createdAt).format("dddd Do MMMM YYYY, HH:mm:ss")
    )
    .setFooter(`No Limit `, bot.user.displayAvatarURL);
  message.channel.send(zEmbed);
};

module.exports.help = {
  name: "userinfo",
};
