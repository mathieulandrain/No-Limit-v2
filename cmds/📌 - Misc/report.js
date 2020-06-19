const Discord = require("discord.js");
const colours = require("../../assets/json/colours.json");
const emotes = require("../../assets/json/emotes.json");
const { reportchanID } = require("../../config.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  let target =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
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

  let rChannel = message.guild.channels.cache.get(`${reportchanID}`);

  message.channel
    .send("Votre report à été envoyer au staff, Merci pour votre contribution.")
    .then((m) => m.delete({ timeout: 5000 }));
  rChannel
    .send(
      `**${message.author.tag}** à report **${target.user.tag}** pour la raison : ${reason}.`
    )
    .then(async (msg) => {
      msg.react(`${emotes.reportyesID}`);
      msg.react(`${emotes.neutreID}`);
      msg.react(`${emotes.reportnoID}`);
    });
};

module.exports.help = {
  name: "report",
  aliases: ["r"],
  category: "📌 - misc",
  description: "Sert à report une personne",
  usage: " @ de la personne à report + la raison",
};
