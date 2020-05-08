const Discord = require("discord.js");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
  if (args[0] == "help")
    return message.channel.send(`Faut juste ${prefix}help`);

  if (args[0]) {
    let command = args[0];
    if (bot.commands.has(command)) {
      command = bot.commands.get(command);
      var SHembed = new Discord.MessageEmbed()
        .setColor(colours.green_dark)
        .setAuthor(`No Limit`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription(`Le prefix du bot est: \`!\`\n\n`);
      message.channel.send(SHembed);
    }
  }

  if (!args[0]) {
    message.delete();
    let embed = new Discord.MessageEmbed()
      .setAuthor(`Commande Help !`, message.guild.iconURL)
      .setColor(colours.green_dark)
      .setDescription(`${message.author.username} Regarde tes MP !`)
      .setFooter(`Commandes Help `, bot.user.displayAvatarURL());

    let Sembed = new Discord.MessageEmbed()
      .setColor(colours.green_dark)
      .setAuthor(`No Limit Help !`, message.guild.iconURL())
      .setThumbnail(bot.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(
        `Ce sont les commandes disponibles pour \`No Limit\` !\nLe prefix du bot est: \`!\` `
      )
      .addField(
        "Commandes pour les membres :",
        "``help`` ``servinfo`` ``userinfo`` ``report`` ``userinfo`` ``help`` ``suggest`` ``uptime``"
      )
      .addField(
        "Commandes pour les Admin :",
        "``kick`` ``ban`` ``unban`` ``mute`` ``tempmute`` ``unmute`` ``tempban`` ``warn`` ``say`` ``clear`` ``dm`` ``ping`` ``uptime`` ``warnings``"
      )
      .setFooter("No Limit", bot.user.displayAvatarURL());
    message.channel.send(embed).then((m) => m.delete({ timeout: 5000 }));
    message.author.send(Sembed);
  }
};

module.exports.help = {
  name: "help",
};
