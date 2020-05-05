const Discord = require("discord.js");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  let target =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!target)
    return message.channel
      .send("Merci de mentionner un utilisateur")
      .then((m) => m.delete({ timeout: 5000 }));
  let reason = args.slice(1).join(" ");
  if (!reason)
    return message.channel
      .send(
        `Merci de dire la raison du report pour pouvoir report l\'utilisateur **${target.user.tag}**`
      )
      .then((m) => m.delete(5000));

  let rChannel = message.guild.channels.cache.find((c) => c.name === "report");

  message.channel
    .send("Votre report à été envoyer au staff, Merci pour votre contribution.")
    .then((m) => m.delete({ timeout: 5000 }));
  rChannel
    .send(
      `**${message.author.tag}** à report **${target.user.tag}** pour la raison : ${reason}.`
    )
    .then(async (msg) => {
      msg.react("✅");
      msg.react("➖");
      msg.react("❌");
    });
};

module.exports.help = {
  name: "report",
};
