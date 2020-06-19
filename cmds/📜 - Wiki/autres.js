const { MessageEmbed } = require("discord.js");
const { version } = require("../../package.json");
const colours = require("../../assets/json/colours.json");
const emotes = require("../../assets/json/emotes.json");
const { prefix } = require("../../config.json");

module.exports.run = (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor(colours.green_light)
    .setTitle(`${emotes.glr} - Autres`)
    .setThumbnail(bot.user.avatarURL())
    .setDescription(
      `Ici vous aurez accès aux pages pour les autres c'est à dire tout ce qui entre pas dans les catégories précedentes.`
    )
    .addField(
      `${emotes.glr} - Autres:`,
      `${emotes.chips} - [Levels](https://galaxylife.fandom.com/wiki/Player_Level_Progression)\n${emotes.base} - [Niveau pour débloquer les bâtiments](https://galaxylife.fandom.com/wiki/Star_Base#Building_Level_Unlocks)\n${emotes.labo} - [Niveau pour débloquer les troupes](https://galaxylife.fandom.com/wiki/Laboratory#Troop_Level_Unlocks)\n${emotes.alliance} - [Alliances](https://galaxylife.fandom.com/wiki/Alliances)`
    )

    .setFooter(`No Limit | Wiki - Autres`, bot.user.displayAvatarURL());

  message.channel.send(embed);
};

module.exports.help = {
  name: "autres",
  aliases: ["autre", "level", "alliance"],
  category: "📜 - wiki",
  description: "Renvoie les infos sur GLR",
  usage: "",
};
