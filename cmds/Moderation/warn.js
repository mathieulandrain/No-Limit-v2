const Discord = require("discord.js");
const botconfig = require("../../config.json");
const colours = require("../../colours.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send("Vous n'avez pas la permission.");
  if (!message.guild.me.hasPermission("ADMINISTRATOR"))
    return "Merci de m'ajoutez la permission `ADMINISTRATOR` pour utilisez cette commande.";

  let member =
    message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  if (!member)
    return message.channel.send("Merci de mentionner un utilisateur");

  let reason = args.slice(1).join(" ");
  if (!reason) return message.channel.send("Merci de dire la raison");
  if (!warns[member.id] || !warns[member.id].length) {
    warns[member.id] = [
      {
        reason: reason ? reason : "Aucune raison",
        date: Date.now(),
        mod: message.author.id,
      },
    ];
  } else {
    warns[member.id].unshift({
      reason: reason ? reason : "Aucune raison",
      date: Date.now(),
      mod: message.author.id,
    });
  }

  fs.writeFileSync("./warnings.json", JSON.stringify(warns));
  console.log(warns[member.id]);
  let warnEmbed = new Discord.MessageEmbed()
    .setDescription(
      `WARNING - Vous venez de recevoir un warn du serveur **${message.guild.name}** avec comme raison : **${reason}**`
    )
    .setColor(colours.orange);

  message.channel.send(`**${member.id}** a bien été warn pour ${reason}`);

  member.createDM().then((channel) => {
    channel.send(warnEmbed);
  });

  let warnlvl = warns[member.id].length;
  message.channel.send(`${member.id} a maintenant ${warnlvl} warn.`);
};

module.exports.help = {
  name: "warn",
};
