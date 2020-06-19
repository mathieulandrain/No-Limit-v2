const { MessageEmbed } = require("discord.js");
const colours = require("../../assets/json/colours.json");
const emotes = require("../../assets/json/emotes.json");
const { prefix } = require("../../config.json");

module.exports.run = (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor(colours.green_light)
    .setAuthor(`📜 - Info`, bot.user.avatarURL())
    .setThumbnail(bot.user.avatarURL())
    .setDescription(
      `Ici vous aurez accès aux pages générale pour des précises regardez la catégorie Wiki dans ${prefix}help ou faite ${prefix}bâtiments, ${prefix}troupes, ${prefix}autres.`
    )
    .addField(
      `${emotes.base} - Bâtiments:`,
      `[Disponible ici](https://galaxylife.fandom.com/wiki/Category:Buildings)`
    )
    .addField(
      `${emotes.colosse} - Troupes:`,
      `[Disponible ici](https://galaxylife.fandom.com/wiki/Category:Troops)`
    )
    .setFooter(`No Limit | Wiki`, bot.user.displayAvatarURL());

  message.channel.send(embed);
};

module.exports.help = {
  name: "wiki",
  aliases: ["wiki"],
  category: "📜 - Wiki",
  description: "Renvoie les infos sur GLR",
  usage: "",
};
