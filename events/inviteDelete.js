const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, invite) => {
  let logchannel = invite.guild.channels.cache.find((c) => c.name === "logs");
  const fetchGuildAuditLogs = await invite.guild.fetchAuditLogs({
    limit: 1,
    type: "INVITE_DELETE",
  });

  const latestInviteDelete = fetchGuildAuditLogs.entries.first();
  // console.log(latestInviteDelete);
  const { executor } = latestInviteDelete;

  const embed = new MessageEmbed()
    .setAuthor(
      `Une invitation a été supprimée`,
      invite.guild.iconURL("png", true)
    )
    .setColor()
    .setThumbnail(invite.guild.iconURL("png", true))
    .setDescription(
      `${invite.url}\n**Salon : **${invite.channel}\n**Serveur : **${invite.guild.name}`
    )
    .setFooter("Invitation supprimée ", bot.user.avatarURL("png", true))
    .setTimestamp();

  logchannel.send(embed);
};
