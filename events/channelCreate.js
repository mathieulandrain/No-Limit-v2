const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, channel) => {
  const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_CREATE",
  });

  const latestChannelCreated = fetchGuildAuditLogs.entries.first();
  console.log(latestChannelCreated);
  const { executor } = latestChannelCreated;

  const embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setColor(colours.green_light)
    .setDescription(
      `${emotes.create} - Création du salon: <#${channel.id}> par <@${executor.id}>`
    )
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL());

  bot.channels.cache.get(`${logchanID}`).send(embed);
};
