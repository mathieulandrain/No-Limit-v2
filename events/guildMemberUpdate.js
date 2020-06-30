const Discord = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = async (bot, oldMember, newMember) => {
  const fetchGuildAuditLogs = await oldMember.guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_UPDATE",
  });

  const latestMemberRoleUpdate = fetchGuildAuditLogs.entries.first();
  // console.log(latestMemberRoleUpdate);
  const { executor } = latestMemberRoleUpdate;

  let logchannel = oldMember.guild.channels.cache.find(
    (c) => c.name === "logs"
  );
  if (!logchannel) return;

  if (oldMember.nickname !== newMember.nickname) {
    let memberUdpate = new Discord.MessageEmbed()
      .setAuthor(
        `Le surnom de ${oldMember.user.tag} a été modifié`,
        newMember.user.displayAvatarURL("png", true)
      )
      .setColor(colours.green_light)
      .setThumbnail(newMember.user.displayAvatarURL("png", true))
      .setDescription(
        `${newMember}\n**Ancien Surnom : **${
          oldMember.nickname == null ? "Rien" : oldMember.nickname
        }\n\n**Nouveau Surnom : **${
          newMember.nickname == null ? "Rien" : newMember.nickname
        }`
      )
      .setFooter("A eu son surnom modifié ", bot.user.avatarURL("png", true))
      .setTimestamp();

    logchannel.send(memberUdpate);
  }

  if (
    oldMember.roles.cache.map((r) => `${r.id}`) !==
    newMember.roles.cache.map((r) => `${r.id}`)
  ) {
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      var lostrole = oldMember.roles.cache
        .map((r) => `${r}`)
        .filter((x) => !newMember.roles.cache.map((r) => `${r}`).includes(x));

      var currrole = newMember.roles.cache.map((r) => `${r}`);

      let roleloseUdpate = new Discord.MessageEmbed()
        .setAuthor(
          `${oldMember.user.tag} a perdu un rôle`,
          newMember.user.displayAvatarURL("png", true)
        )
        .setColor(colours.orange)
        .setThumbnail(newMember.user.displayAvatarURL("png", true))
        .setDescription(
          `**Rôle perdu : **${lostrole}\n\n**Rôle actuels : **${currrole}`
        )
        .setFooter("A perdu un rôle", bot.user.avatarURL("png", true))
        .setTimestamp();

      logchannel.send(roleloseUdpate);
    }

    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      var gainrole = newMember.roles.cache
        .map((r) => `${r}`)
        .filter((x) => !oldMember.roles.cache.map((r) => `${r}`).includes(x));

      var currrole = `${newMember.roles.cache.map((r) => `${r}`)}`;

      let rolegainUdpate = new Discord.MessageEmbed()
        .setAuthor(
          `${newMember.user.tag} a gagné un rôle`,
          newMember.user.displayAvatarURL("png", true)
        )
        .setColor(colours.green_light)
        .setThumbnail(newMember.user.displayAvatarURL("png", true))
        .setDescription(
          `**Rôle gagné : **${gainrole}\n\n**Rôle actuels : **${currrole}`
        )
        .setFooter("A gagné un rôle ", bot.user.avatarURL("png", true))
        .setTimestamp();

      logchannel.send(rolegainUdpate);
    }
  }
};
