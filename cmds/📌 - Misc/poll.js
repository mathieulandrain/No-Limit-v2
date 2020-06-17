const { MessageEmbed } = require("discord.js");
const { yes, neutre, no, yesID, neutreID, noID } = require("../../emotes.json");
const colours = require("../../colours.json");

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
      `
    ${yes} - Pour (Oui)
    ${neutre} - Neutre
    ${no} - Contre (Non)
    `
    )
    .setTimestamp()
    .setFooter("Merci de voter qu'une fois.");

  const poll = await message.channel.send(embed);
  await poll.react(`${yesID}`);
  await poll.react(`${neutreID}`);
  await poll.react(`${noID}`);
};

module.exports.help = {
  name: "sondage",
  aliases: ["poll"],
  category: "📌- misc",
  description: "Permet de faire des sondage",
  usage: "+ question",
};
