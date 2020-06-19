const Discord = require("discord.js");
const botconfig = require("../../config.json");
const colours = require("../../assets/json/colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("Vous n'avez pas la permission.");

  let DMember =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!DMember)
    return message.channel.send(
      "Veuillez mettre l'utilisateur pour envoyer le message"
    );

  if (args[0] !== `<@!${DMember.id}>` && args[0] !== DMember.id) {
    return message.channel.send(
      "L'utilisateur doit être mentionné avant le message"
    );
  }

  let email = args.join(" ").slice(args[0].length);
  if (!email)
    return message.channel.send("Vous devez mettre le messages pour l'envoie.");

  let MSG = new Discord.MessageEmbed()
    .setTitle("Message de la No Limit")
    .setThumbnail(bot.user.displayAvatarURL())
    .setColor(colours.green_light)
    .addField("**Vous avez un message de l'Alliance :**", `${email}`)
    .setFooter(`Message - No Limit `, bot.user.displayAvatarURL());
  DMember.send(MSG);
};

module.exports.help = {
  name: "dm",
  aliases: ["dm"],
  category: "🚨 - moderation",
  description: "Envoyer un message en DM",
  usage: "+ @delapersonne + le message",
};
