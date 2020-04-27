const Discord = require("discord.js");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
  let kickedUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!kickedUser) {
    return message.channel.send("**Personne non trouvée.**");
  }
  let kickReason = args.join(" ").slice(22);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Tu n'a pas la permission !");
  }
  if (kickedUser.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Tu ne peut pas kick cette personne.");
  }
  let kickEmbed = new Discord.RichEmbed()
    .setDescription("-Kick-")
    .setThumbnail(message.guild.iconURL)
    .setColor(colours.red_light)
    .addField(
      "Cette utilisateur a été kick:",
      `${kickedUser} (ID: ${kickedUser.id})`
    )
    .addField(
      "Il a été kick par:",
      `${message.author} (ID: ${message.author.id})`
    )
    .addField("Canal", message.channel)
    .addField("Raison", kickReason)
    .setFooter(`Kick - No Limit `, bot.user.displayAvatarURL);

  let kickChannel = message.guild.channels.find(`name`, "logs");
  if (!kickChannel) {
    return message.channel.send(
      "Canal 'logs' non trouvé. S'il vous plaît créer le."
    );
  }
  message.guild.member(kickedUser).kick(kickReason);
  kickChannel.send(kickEmbed);
};

module.exports.help = {
  name: "kick",
};
