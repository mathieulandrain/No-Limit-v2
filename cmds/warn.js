const Discord = require("discord.js");
const botconfig = require("../config.json");
const colours = require("../colours.json");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send("Vous n'avez pas la permission.");
  if (!message.guild.me.hasPermission("ADMINISTRATOR"))
    return "Merci de m'ajoutez la permission `ADMINISTRATOR` pour utilisez cette commande.";

  let member = message.mentions.members.first();
  if (!member)
    return message.channel.send("Merci de mentionner un utilisateur");
  if (
    member.highestRole.calculatePosition >=
      message.member.highestRole.calculatePosition &&
    message.author.id
  )
    return message.channel.send(
      "Vous n'avez pas la permission de warn cette personne"
    );
  let reason = args.slice(1).join(" ");
  if (!reason) return message.channel.send("Merci de dire la raison");
  if (!warns[member.id])
    warns[member.id] = {
      warns: 0,
    };
  warns[member.id].warns++;

  fs.writeFileSync("./warnings.json", JSON.stringify(warns, reason));

  let warnEmbed = new Discord.MessageEmbed()
    .setDescription(
      `WARNING - Vous venez de recevoir un warn du serveur **${message.guild.name}** avec comme raison : **${reason}**`
    )
    .setColor(colours.orange);

  message.channel.send(member + " à bien été warn pour " + reason);

  member.createDM().then((channel) => {
    channel.send(warnEmbed);
  });

  let warnlvl = warns[member.id].warns;
  message.channel.send(`${member} à maintenant ${warnlvl} warn.`);
};

module.exports.help = {
  name: "warn",
};
