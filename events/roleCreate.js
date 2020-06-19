const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, role) => {
  const fetchGuildAuditLogs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_CREATE",
  });

  const latestRoleCreate = fetchGuildAuditLogs.entries.first();
  console.log(latestRoleCreate);
  const { executor } = latestRoleCreate;

  const embed = new MessageEmbed()
    .setAuthor(`Un rôle a été créé`, role.guild.iconURL("png", true))
    .setThumbnail(role.guild.iconURL("png", true))
    .setColor(colours.green_light)
    .setDescription(
      `**Nom : **${
        role.name
      }\n**Permissions :**\n${role.permissions.toArray().join("\n")}`
    )
    .setFooter("Role créé ", bot.user.avatarURL("png", true))
    .setTimestamp();

  bot.channels.cache.get(`${logchanID}`).send(embed);
};
