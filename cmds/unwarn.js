const Discord = require("discord.js");
const botconfig = require("../config.json");
const colours = require("../colours.json");
const fs = require("fs");
let warn = require("../warnings.json");

module.exports.run = async (bot, message, args, prefix) => {
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send("Vous n'avez pas la permission.");
  if (!message.guild.me.hasPermission("ADMINISTRATOR"))
    return "Merci de m'ajoutez la permission `ADMINISTRATOR` pour utilisez cette commande.";

  let member = message.mentions.users.first();
  if (!member)
    return message.channel.send("Merci de mentionner un utilisateur");

  if (!warns[member.id] || !warns[member.id].length)
    return message.channel.send("Ce membre n'a actuellement aucun warns.");

  if (warns[member.id].length >= args[1]) {
    warns[member.id].splice(args[1], 1);
  } else {
    return message.channel.send(
      `Il se peut que le numéro du warn que vous cherchez à supprimer n\'existe pas ! Veuillez utiliser \`\`${prefix}warnings @utilisateur\`\` pour voir les warns et leurs numéros`
    );
  }

  fs.writeFileSync("./warnings.json", JSON.stringify(warns));
  message.channel.send(
    `Le warn numéro ${args[1]} de ${member} a été retiré :white_check_mark:`
  );
};

module.exports.help = {
  name: "unwarn",
};
