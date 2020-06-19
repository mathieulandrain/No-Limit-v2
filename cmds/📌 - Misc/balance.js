const Discord = require("discord.js");
const utip = require("utip.io");
const colours = require("../../assets/json/colours.json");
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {
  message.channel.send("Chargement des informations... (15 secondes)");
  let information = await utip.utipInfo(`${config.utipID}`, "balance");
  console.log(information);
  let UtEmbed = new Discord.MessageEmbed()
    .setColor(colours.green_light)
    .setTitle("uTip - Mathieu")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(`${message.guild.name} - Don`, message.guild.iconURL())
    .addField("Nous avons récolté :", `**${information}**`)
    .addField(
      "Merci !",
      `Tout ceux qui on participé envoyez un message au <@&708354922319708250> pour avoir le rôle <@&708258240718307420> quand vous avez regardé **1€50** de PUBS.`
    )
    .setTimestamp()
    .setFooter(
      `No Limit - uTip Mathieu `,
      bot.user.displayAvatarURL("png", true)
    );
  message.channel.send(UtEmbed);
  let myGuild = bot.guilds.cache.get(`${config.Serveur_ID}`);
  let utipCount = information;
  let utipCountChannel = myGuild.channels.cache.get(`${config.utipchanID}`);
  utipCountChannel.setName(`💸Nous avons: ${config.utipCount}`);
};
module.exports.help = {
  name: "balanceutip",
  aliases: ["bu"],
  category: "📌- misc",
  description: "Informe de la somme récolté sur uTip",
  usage: "",
};
