const Discord = require("discord.js");
const botconfig = require("../config.json");
const colours = require("../colours.json");
const fs = require("fs");
let warn = require("../warnings.json");
const moment = require("moment");
moment.locale("fr");

module.exports.run = async (bot, message, args) => {
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      "Vous n'avez pas la permission d'utiliser cette commande"
    );
  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!member) return message.channel.send("Veuillez mentionner un membre");
  if (!warns[member.id]) {
    warns[member.id] = [
      {
        reason: reason ? reason : "Aucune raison",
        date: Date.now(),
        mod: message.author.id,
      },
    ];
  }

  fs.writeFileSync("./warnings.json", JSON.stringify(warns));

  let embed = new Discord.MessageEmbed()
    .setColor(colours.red_light)
    .setTitle("Warnings")
    .setAuthor(member.user.username, member.user.displayAvatarURL())
    .addField(
      "10 derniers warns",
      warns[member.id] && warns[member.id].length
        ? warns[member.id]
            .slice(0, 10)
            .map(
              (e, index) =>
                `N°${index} :\n- Warn : ${e.reason}\n- Datant du ${moment(
                  e.date
                ).format(
                  "dddd Do MMMM YYYY à H:mm:ss"
                )} \n- Modérateur : ${bot.users.cache.get(e.mod)}`
            )
            .reverse()
            .join("\n-----------------\n")
        : "Ce membre n'a aucun warns"
    )
    .setFooter(`No Limit - Warnings `, bot.user.displayAvatarURL())
    .setTimestamp();
  message.channel.send(embed);
};

module.exports.help = {
  name: "warnings",
};
