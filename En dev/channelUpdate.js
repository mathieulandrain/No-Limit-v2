const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, oldChannel, newChannel) => {
  let liste = [config.memberCountChannelID, config.utipchanID];
  if (liste.includes(newChannel.id) || liste.includes(oldChannel.id)) return;
  const fetchGuildAuditLogs = await oldChannel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_UPDATE",
  });

  const latestChannelUpdate = fetchGuildAuditLogs.entries.first();
  console.log(latestChannelUpdate);
  const { executor } = latestChannelUpdate;

  const embed = new MessageEmbed()
    .setAuthor(bot.user.username, bot.user.displayAvatarURL())
    .setColor(colours.orange)
    .setDescription(
      `${emotes.update} - Modification du salon <#${newChannel.id}>\nAnciennement \`\`#${oldChannel.name}\`\` modifié par <@${executor.id}>`
    )
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL());

  bot.channels.cache.get(`${config.logchanID}`).send(embed);
};
