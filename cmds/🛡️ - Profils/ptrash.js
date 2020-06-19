const Discord = require("discord.js");
const colours = require("../../assets/json/colours.json");
const emotes = require("../../assets/json/emotes.json");
const membres = require("../../assets/json/membres.json");

module.exports.run = async (bot, message, args) => {
  let aEmbed = new Discord.MessageEmbed()
    .setColor(colours.green_light)
    .setTitle(`${emotes.profil} - Profil GLR`)
    .setThumbnail(message.guild.iconURL())
    .addField(
      "Pour aller sur le profil de",
      `<@${membres.trash}> [clic ici](https://discordapp.com/channels/683734629945311349/717462020240441424/717464733296492546)`
    )
    .setFooter(
      `No Limit - Profil GLR `,
      bot.user.displayAvatarURL("png", true)
    );
  message.channel.send(aEmbed);
};

module.exports.help = {
  name: `ptrash`,
  aliases: ["ptrash"],
  category: "🛡️ - profils",
  description: "Avoir accès au profil GLR d'un membre",
  usage: "",
};
