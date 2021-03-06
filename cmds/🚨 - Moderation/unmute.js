const Discord = require("discord.js");
const colours = require("../../assets/json/colours.json");
const { logchanID } = require("../../config.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
    return message.channel.send(
      "Vous n'avez pas la permissions pour faire cette commande !"
    );
  if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
    return message.channel.send(
      "Veuillez m'ajoutez ces permissions `MANAGE_ROLES` + `ADMINISTRATOR` pour utilisez cette commande."
    );

  let mutee =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!mutee)
    return message.channel.send("Veuillez mentionner la personne à unmute.");

  let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
  if (!muterole) return message.channel.send("Le grade `Muted` n'existe pas !");

  mutee.roles.remove(muterole.id).then(() => {
    message.delete();

    let MuteEmbed = new Discord.MessageEmbed()
      .setDescription(
        `UNMUTED - Vous avez été unmute dans le serveur \`${message.guild.name}\``
      )
      .setColor(colours.green_dark);

    mutee.send(MuteEmbed).catch((err) => console.log(err));
    let UnMuteLogEmbed = new Discord.MessageEmbed()
      .setColor(colours.green_light)
      .addField("unMute", `${mutee.user.tag} à été unmute.`)
      .setFooter(`No Limit - unMute`, bot.user.displayAvatarURL());
    message.channel.send(UnMuteLogEmbed);
  });

  let MuteLogEmbed = new Discord.MessageEmbed()
    .setColor(colours.orange)
    .setAuthor(`${message.guild.name} LOG`)
    .setThumbnail(message.guild.iconURL())
    .addField("Moderation :", "**UNMUTE**")
    .addField("Utilisateur ayant été unmute", mutee.user.username)
    .addField("Utilisateur ayant unmute", message.author.tag)
    .setFooter(`No Limit `, bot.user.displayAvatarURL());

  let lChannel = message.guild.channels.cache.get(`${logchanID}`);
  lChannel.send(MuteLogEmbed);
};

module.exports.help = {
  name: "unmute",
  aliases: ["unmute"],
  category: "🚨 - moderation",
  description: "unMute une personne.",
  usage: "+ @delapersonne",
};
