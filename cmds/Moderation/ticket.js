const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();

  let TicketEmbed = new Discord.MessageEmbed()
    .setColor("#cd3")
    .setAuthor("Support du serveur")
    .setDescription("Pour créer un ticket, appuyez sur la réaction")
    .setFooter(`Support du serveur No Limit `, bot.user.displayAvatarURL);

  message.channel.send(TicketEmbed).then(async (msg) => {
    msg.react("🎟️");
  });
};

module.exports.help = {
  name: "ticket",
  aliases: ["ticket"],
  category: "moderation",
  description: "Met un embed de ticket",
  usage: "",
};
