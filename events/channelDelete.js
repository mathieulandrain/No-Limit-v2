const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, channel) => {
  const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_DELETE",
  });

  const latestChannelDeleted = fetchGuildAuditLogs.entries.first();
  console.log(latestChannelDeleted);
  const { executor } = latestChannelDeleted;

  const embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setColor(colours.red_light)
    .setDescription(
      `${emotes.delete} - Suppression du salon #${channel.name} par <@${executor.id}>`
    )
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL());

  bot.channels.cache.get(`${logchanID}`).send(embed);
};
