const Discord = require("discord.js");
const colours = require("../colours.json");
const moment = require("moment");
moment.locale("fr");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  let userinfo =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!userinfo)
    return message.channel.send("Veuillez mentionner la personne.");
  if (!warns[userinfo.user.id])
    warns[userinfo.user.id] = {
      warns: 0,
    };
  let warnlvl = warns[userinfo.user.id].warns;

  let zEmbed = new Discord.MessageEmbed()
    .setColor(colours.cyan)
    .setTitle("Infos de l'utilisateur")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(
      `${userinfo.user.username} - Infos`,
      userinfo.user.displayAvatarURL()
    )
    .addField("**Nom de l'utilisateur**", `${userinfo.user.username}`, true)
    .addField("**#**", `${userinfo.user.discriminator}`, true)
    .addField("**ID**", `${userinfo.user.id}`)
    .addField("**Nombre de warn reçu**", `${warnlvl}`)
    .addField("**Status**", `${userinfo.user.presence.status}`, true)
    .addField(
      "**Crée le :**",
      moment
        .utc(userinfo.user.createdAt)
        .format("dddd Do MMMM YYYY, à HH:mm:ss")
    )
    .setFooter(`Utilisateur - No Limit `, bot.user.displayAvatarURL());
  message.channel.send(zEmbed);
};

module.exports.help = {
  name: "userinfo",
};
