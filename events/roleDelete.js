const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, role) => {
  const fetchGuildAuditLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_DELETE",
  });

  const latestRoleDelete = fetchGuildAuditLogs.entries.first();
  console.log(latestRoleDelete);
  const { executor } = latestRoleDelete;

  const embed = new MessageEmbed()
    .setAuthor(`Un rôle a été supprimé`, role.guild.iconURL("png", true))
    .setColor(colours.red_light)
    .setThumbnail(role.guild.iconURL("png", true))
    .setDescription(
      `**Nom : **${
        role.name
      }\n**Permissions :**\n${role.permissions.toArray().join("\n")}`
    )
    .setFooter("Role supprimé ", bot.user.avatarURL("png", true))
    .setTimestamp();

  bot.channels.cache.get(`${logchanID}`).send(embed);
};
