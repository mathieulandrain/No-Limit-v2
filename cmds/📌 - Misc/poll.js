const { MessageEmbed } = require("discord.js");
const { yes, neutre, no, yesID, neutreID, noID } = require("../../emotes.json");

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor("#ad14da")
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
