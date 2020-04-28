const Discord = require("discord.js");
const botconfig = require("../config.json");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send("Vous n'avez pas la permission.");

  let DMember =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!DMember)
    return message.channel.send(
      "Veuillez mettre l'utilisateur pour envoyer le message"
    );

  let email = args.join(" ").slice(22);
  if (!email)
    return message.channel.send("Vous devez mettre le messages pour l'envoie.");

  let MSG = new Discord.MessageEmbed()
    .setTitle("Message de la No Limit")
    .setThumbnail("../assets/logo.jpg")
    .setColor(colours.green_light)
    .addField("**Vous avez un message de l'Alliance :**", `${email}`)
    .setFooter(`Message - No Limit `, bot.user.displayAvatarURL);
  DMember.send(MSG);
};

module.exports.help = {
  name: "dm",
};
