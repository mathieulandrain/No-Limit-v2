const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();

  let argsresult;
  let mChannel = message.mentions.channels.first();

  if (!mChannel) return message.channel.send("Mentionnez le salon");
  let messageToBot = args.slice(1).join(" ");
  if (!messageToBot) return message.channel.send("Merci de mettre le message");

  var embedSaying = new Discord.MessageEmbed()
    .setTitle(":loudspeaker:  Suggestion")
    .setThumbnail(message.author.displayAvatarURL())
    .setColor("#cd3")
    .setDescription(`${messageToBot}`)
    .setFooter(
      `Suggestion faite par ${message.author.username}`,
      bot.user.displayAvatarURL()
    );

  mChannel.send(embedSaying).then(async (msg) => {
    await msg.react("✅");
    await msg.react("➖");
    await msg.react("❌");
  });
};

module.exports.help = {
  name: "suggest",
  aliases: ["s"],
  category: "misc",
  description: "Permet de faire une suggestion.",
  usage: "<command_name> + #suggestion + votre suggestion",
};
