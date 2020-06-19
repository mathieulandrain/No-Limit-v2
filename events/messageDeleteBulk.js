const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, messages) => {
  const fetchGuildAuditLogs = await messages.first().guild.fetchAuditLogs({
    limit: 1,
    type: "MESSAGE_BULK_DELETE",
  });

  const latestMessageBulkDelete = fetchGuildAuditLogs.entries.first();
  //console.log(latestMessageBulkDelete);
  const { executor } = latestMessageBulkDelete;

  const embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setTitle(`${emotes.delete} - ${messages.size} messages on été supprimés`)
    .setColor(colours.red_light)
    .setThumbnail(messages.first().guild.iconURL("png", true))
    .setDescription(
      `\n**Salon : **${
        messages.first().channel
      }\n**Messages Supprimés : **\n${messages
        .array((message) => `${message.content}`)
        .join("\n")}`
    )
    .setFooter("Messages supprimés ", bot.user.avatarURL("png", true))
    .setTimestamp();

  bot.channels.cache.get(`${logchanID}`).send(embed);
};
