const { MessageEmbed } = require("discord.js");
const emotes = require("../../assets/json/emotes.json");
const colours = require("../../assets/json/colours.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]))
    return message.channel.send(
      "** Vous ne pouvez pas utiliser cette commande ! ** "
    );
  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setThumbnail(message.author.displayAvatarURL())
    .setColor(colours.blue_light)
    .setDescription(args.join(" "))
    .addField(
      "Répondre à la question ci-dessus à l'aide d'une des réactions:",
      `\n${emotes.yes} - Pour (Oui)\n${emotes.neutre} - Neutre\n${emotes.no} - Contre (Non)`
    )
    .setTimestamp()
    .setFooter("Merci de voter qu'une fois.");

  const poll = await message.channel.send(embed);
  await poll.react(`${emotes.yesID}`);
  await poll.react(`${emotes.neutreID}`);
  await poll.react(`${emotes.noID}`);
};

module.exports.help = {
  name: "sondage",
  aliases: ["poll"],
  category: "📌- misc",
  description: "Permet de faire des sondage",
  usage: "+ question",
};
