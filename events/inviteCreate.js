const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, invite) => {
  let logchannel = invite.guild.channels.cache.find((c) => c.name === "logs");
  const fetchGuildAuditLogs = await invite.guild.fetchAuditLogs({
    limit: 1,
    type: "INVITE_CREATE",
  });

  const latestInviteCreate = fetchGuildAuditLogs.entries.first();
  console.log(latestInviteCreate);
  const { executor } = latestInviteCreate;

  const embed = new MessageEmbed()
    .setAuthor(`Une invitation a été créée`, invite.guild.iconURL("png", true))
    .setThumbnail(invite.guild.iconURL("png", true))
    .setDescription(
      `${invite.url}\n**Salon : **${invite.channel}\n**Serveur : **${
        invite.guild.name
      }\n**Créé par : **${invite.inviter}\n${
        invite.maxAge == 0
          ? "Elle n'expirera jamais"
          : `Elle expira dans ${invite.maxAge} secondes`
      }`
    )
    .setFooter("Invitation créée ", bot.user.avatarURL("png", true))
    .setTimestamp();
  logchannel.send(embed);
};
