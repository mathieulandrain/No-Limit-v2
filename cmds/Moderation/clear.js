const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply(":x:  Vous n'avez pas la permission.");
  if (!args[0])
    return message.reply("Syntaxe: !clear <entrer le nombre à supprimer>");

  message.channel.bulkDelete(args[0]).then(() => {
    message.channel
      .send(`J'ai supprimé ***${args[0]} messages***`)
      .then((msg) => msg.delete({ timeout: 5000 }));
  });
};

module.exports.help = {
  name: "clear",
  aliases: ["purge"],
  category: "moderation",
  description: "Supprimer plusieurs messages avec une commande.",
  usage: "+ nombre de messages à supprimer.",
};
