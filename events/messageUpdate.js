const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, oldMessage, newMessage) => {
  if (oldMessage.author.bot || oldMessage.content == newMessage.content) return;
  const embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setTitle(`${emotes.update} - Modification d'un message`)
    .setThumbnail(oldMessage.author.displayAvatarURL())
    .setColor(colours.orange)
    .setDescription(
      `[Aller au message modifié](${oldMessage.url})\n**Salon : **${oldMessage.channel}\n**Auteur : **${newMessage.author}\n**Message avant : **\n${oldMessage.content}\n\n**Message après : **\n${newMessage.content}`
    )
    .setTimestamp()
    .setFooter(
      oldMessage.author.username,
      oldMessage.author.displayAvatarURL()
    );

  bot.channels.cache.get(`${logchanID}`).send(embed);
};
