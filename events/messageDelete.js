const Discord = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, message) => {
  let logchannel = bot.channels.cache.get(logchanID);
  if (!logchannel) return;

  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: "MESSAGE_DELETE",
  });

  const date = new Date();
  const deletionLog = fetchedLogs.entries.first();

  const { executor, target } = deletionLog;

  if (!deletionLog || deletionLog.createdAt !== date) {
    let messageDelete = new Discord.MessageEmbed()
      .setAuthor(
        bot.user.username,
        message.author.displayAvatarURL("png", true)
      )
      .setTitle(`${emotes.delete} - Un message a été supprimé`)
      .setColor(colours.red_light)
      .setThumbnail(message.author.displayAvatarURL("png", true))
      .setDescription(
        `**Auteur : **${message.author}\n**Salon : **${message.channel}\n**Message Supprimé : **\n${message.content}\n**Supprimé par : **${message.author}`
      )
      .setFooter("Message supprimé ", bot.user.avatarURL("png", true))
      .setTimestamp();

    logchannel.send(messageDelete);
    return;
  }

  if (!executor) {
    let messageDelete = new Discord.MessageEmbed()
      .setAuthor(
        bot.user.username,
        message.author.displayAvatarURL("png", true)
      )
      .setTitle(`${emotes.delete} - Un message a été supprimé`)
      .setColor(colours.red_light)
      .setThumbnail(message.author.displayAvatarURL("png", true))
      .setDescription(
        `**Auteur : **${message.author}\n**Salon : **${message.channel}\n**Message Supprimé : **\n${message.content}\n**Supprimé par : **${message.author}`
      )
      .setFooter("Message supprimé ", bot.user.avatarURL("png", true))
      .setTimestamp();

    logchannel.send(messageDelete);
  } else if (executor) {
    let messageDelete = new Discord.MessageEmbed()
      .setAuthor(
        bot.user.username,
        message.author.displayAvatarURL("png", true)
      )
      .setTitle(`${emotes.delete} - Un message a été supprimé`)
      .setColor(colours.red_light)
      .setThumbnail(message.author.displayAvatarURL("png", true))
      .setDescription(
        `**Auteur : **${message.author}\n**Salon : **${message.channel}\n**Message Supprimé : **\n${message.content}\n**Supprimé par : **${message.author}`
      )
      .setFooter("Message supprimé ", bot.user.avatarURL("png", true))
      .setTimestamp();

    logchannel.send(messageDelete);
  }
};
