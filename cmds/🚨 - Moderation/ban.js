const Discord = require("discord.js");
const colours = require("../../assets/json/colours.json");
const { logchanID } = require("../../config.json");

module.exports.run = async (bot, message, args) => {
  let bannedUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  if (!bannedUser) {
    return message.channel.send("**Personne non trouvée.**");
  }
  let banReason = args.join(" ").slice(19);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Tu n'a pas la permission !");
  }
  if (bannedUser.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Tu ne peut pas ban cette personne.");
  }
  let banEmbed = new Discord.MessageEmbed()
    .setDescription("~Ban~")
    .setThumbnail(bot.user.displayAvatarURL())
    .setColor(colours.red_light)
    .addField(
      "Cette utilisateur a été ban:",
      `${bannedUser} (ID: ${bannedUser.id})`
    )
    .addField(
      "Il a été ban par:",
      `${message.author} (ID: ${message.author.id})`
    )
    .addField("Canal", message.channel)
    .addField("Raison", banReason)
    .setFooter(`Ban - No Limit `, bot.user.displayAvatarURL());

  let bandmEmbed = new Discord.MessageEmbed()
    .setDescription(
      `WARNING - Vous venez d'être ban du serveur **${message.guild.name}** avec comme raison : **${banReason}**`
    )
    .setColor(colours.red_dark);

  bannedUser.createDM().then((channel) => {
    channel.send(bandmEmbed);
  });

  let banChannel = message.guild.channels.cache.get(`${logchanID}`);
  if (!banChannel) {
    return message.channel.send(
      "Canal 'logs' non trouvé. S'il vous plaît créer le."
    );
  }
  message.guild.member(bannedUser).ban(banReason);
  banChannel.send(banEmbed);
};

module.exports.help = {
  name: "ban",
  aliases: ["ban"],
  category: "🚨 - moderation",
  description: "Ban une personne.",
  usage: " + @delapersonne + raison",
};
