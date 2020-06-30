const Discord = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, oldRole, newRole) => {
  let logchannel = oldRole.guild.channels.cache.find((c) => c.name === "logs");

  const fetchGuildAuditLogs = await oldRole.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_UPDATE",
  });

  const latestRoleUpdate = fetchGuildAuditLogs.entries.first();
  // console.log(latestRoleUpdate);
  const { executor } = latestRoleUpdate;

  if (oldRole.name !== newRole.name) {
    let roleUpdate = new Discord.MessageEmbed()
      .setAuthor(
        `Le nom d'un rôle a été modifié`,
        oldRole.guild.iconURL("png", true)
      )
      .setColor(colours.orange)
      .setThumbnail(newRole.guild.iconURL("png", true))
      .setDescription(
        `**Ancien Nom : **${oldRole.name}\n\n**Nouveau nom : **${newRole.name}`
      )
      .setFooter("Nom du rôle modifié ", bot.user.avatarURL("png", true))
      .setTimestamp();

    logchannel.send(roleUpdate);
  }

  if (
    oldRole.permissions.toArray().length > newRole.permissions.toArray().length
  ) {
    var lostperms = oldRole.permissions
      .toArray()
      .filter((x) => !newRole.permissions.toArray().includes(x));

    let roleUpdate = new Discord.MessageEmbed()
      .setAuthor(
        `Les permissions d'un rôle ont été enlevées`,
        oldRole.guild.iconURL("png", true)
      )
      .setColor()
      .setThumbnail(newRole.guild.iconURL("png", true))
      .setDescription(
        `**Nom : **${
          oldRole.name
        }\n**Permissions enlevées : **\n${lostperms.join("\n")}`
      )
      .setFooter("Permission enlevées ", bot.user.avatarURL("png", true))
      .setTimestamp();

    logchannel.send(roleUpdate);
  }

  if (
    oldRole.permissions.toArray().length < newRole.permissions.toArray().length
  ) {
    var gainperms = newRole.permissions
      .toArray()
      .filter((x) => !oldRole.permissions.toArray().includes(x));

    let roleUpdate = new Discord.MessageEmbed()
      .setAuthor(
        `Les permissions d'un rôle ont été ajoutées`,
        oldRole.guild.iconURL("png", true)
      )
      .setColor()
      .setThumbnail(newRole.guild.iconURL("png", true))
      .setDescription(
        `**Nom : **${
          oldRole.name
        }\n**Permissions ajoutées : **\n${gainperms.join("\n")}`
      )
      .setFooter("Permission ajoutées ", bot.user.avatarURL("png", true))
      .setTimestamp();

    logchannel.send(roleUpdate);
  }
};
