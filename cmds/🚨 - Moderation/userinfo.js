const Discord = require("discord.js");
const colours = require("../../colours.json");
const moment = require("moment");
moment.locale("fr");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  let inline = true;
  let resence = true;

  const status = {
    online: "En ligne",
    idle: "Inactif",
    offline: " Hors-Ligne/Invisble",
    dnd: " Ne pas déranger",
  };
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  let userinfo =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (!warns[userinfo.user.id]) {
    warns[userinfo.user.id] = [{}];
  }
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Tu n'a pas la permission !");
  }
  let warnlvl = warns[userinfo.user.id].length;

  var act = [];
  userinfo.user.presence.activities.forEach((activity) => {
    act.push(`${activity.name} - ${activity.state}`);
  });
  console.log(act);

  let zEmbed = new Discord.MessageEmbed()
    .setColor(colours.cyan)
    .setTitle("Infos de l'utilisateur")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(
      `${userinfo.user.username} - Infos`,
      userinfo.user.displayAvatarURL()
    )
    .addField("**Nom de l'utilisateur**", `${userinfo.user.username}`, true)
    .addField("**#**", `${userinfo.user.discriminator}`, true)
    .addField("**ID**", `${userinfo.user.id}`)
    .addField("**Nombre de warn reçu**", `${warnlvl}`)
    .addField(
      "**Statut :**",
      `${status[userinfo.user.presence.status]}`,
      inline,
      true
    )
    .addField(
      "**Crée le :**",
      moment
        .utc(userinfo.user.createdAt)
        .format("dddd Do MMMM YYYY, à HH:mm:ss")
    )
    .addField(
      "**Nous a rejoins le :**",
      moment.utc(userinfo.joinedAt).format("dddd Do MMMM YYYY, à HH:mm:ss")
    )
    .addField(
      "Joue à 🎮 :",
      `${
        userinfo.user.presence.activities.length
          ? `${act.join("\n")}`
          : "❌ Ne joue pas"
      }`,
      inline,
      true
    )
    .addField(
      "**Rôles :**",
      `${
        userinfo.roles.cache
          .filter((r) => r.id !== message.guild.id)
          .map((roles) => `<@&${roles.id}>`)
          .join(" **|** ") || "❌ N'a pas de roles !"
      }`,
      true
    )
    .setFooter(`Utilisateur - No Limit `, bot.user.displayAvatarURL());
  message.channel.send(zEmbed);
};

module.exports.help = {
  name: "userinfo",
  aliases: ["ui"],
  category: "🚨 - moderation",
  description: "Connaître les infos d'une personne.",
  usage: "+ @delapersonne ou ID",
};
