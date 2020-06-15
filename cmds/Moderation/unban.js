const Discord = require("discord.js");
const colours = require("../../colours.json");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send("Vous n'avez pas la permission");

  let unbanMember = await bot.users.fetch(args[0]);
  if (!unbanMember)
    return message.channel.send("La personne à unban est introuvable.");

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "Aucune raison donnée !";
  if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
    return message.channel.send("Vérifier mes permissions");

  try {
    message.guild.member(unbanMember).unban({ reason: reason });
    message.channel.send(`${unbanMember} à été unban du serveur`);
  } catch (e) {
    console.log(e.message);
  }

  let embed = new Discord.MessageEmbed()
    .setColor(colours.green_dark)
    .setAuthor(`${message.guild.name} LOG`, bot.user.displayAvatarURL())
    .addField("Moderation :", "unban")
    .addField(
      "Utilisateur ayant été unban :",
      `${unbanMember.username} (${unbanMember.id})`
    )
    .addField("Utilisateur ayant unban :", message.author.username)
    .addField("Raison :", reason)
    .setTimestamp()
    .setFooter(`unBan - No Limit `, bot.user.displayAvatarURL());

  let lChannel = message.guild.channels.cache.find((c) => c.name === "logs");
  lChannel.send(embed);
};

module.exports.help = {
  name: "unban",
  aliases: ["unban"],
  category: "moderation",
  description: "Unban une personne.",
  usage: "+ **ID**delapersonne",
};
