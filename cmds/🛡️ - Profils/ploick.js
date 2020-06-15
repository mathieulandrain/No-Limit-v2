const Discord = require("discord.js");
const colours = require("../../colours.json");

module.exports.run = async (bot, message, args) => {
  let aEmbed = new Discord.MessageEmbed()
    .setColor(colours.green_light)
    .setTitle("Profile GLR")
    .setThumbnail(message.guild.iconURL())
    .addField(
      "Pour aller sur le profil de",
      "<@372055953199333376> [clic ici](https://discordapp.com/channels/683734629945311349/717462020240441424/717464439217061930)"
    )
    .setFooter(
      `No Limit - Profil GLR `,
      bot.user.displayAvatarURL("png", true)
    );
  message.channel.send(aEmbed);
};

module.exports.help = {
  name: `ploick`,
  aliases: ["ploick"],
  category: "🛡️ - profils",
  description: "Avoir accès au profil GLR d'un membre",
  usage: "",
};
