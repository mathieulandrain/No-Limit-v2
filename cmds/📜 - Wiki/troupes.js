const { MessageEmbed } = require("discord.js");
const { version } = require("../../package.json");
const colours = require("../../colours.json");
const {
  marine,
  pilleur,
  flamme,
  bazooka,
  kami,
  starlin,
  esquade,
  bérets,
  colosse,
  strikes,
  tank,
  raider,
  taupe,
  guepe,
  zep,
  ovni,
  falcon,
} = require("../../emotes.json");
const { prefix } = require("../../config.json");

module.exports.run = (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor(colours.green_light)
    .setTitle(`${colosse} - Troupes`)
    .setThumbnail(bot.user.avatarURL())
    .setDescription(`Ici vous aurez accès aux pages pour les troupes.`)
    .addField(
      `${starlin} - Infanterie:`,
      `${marine} - [Marine](https://galaxylife.fandom.com/wiki/Marine)\n${pilleur} - [Pilleur](https://galaxylife.fandom.com/wiki/Looter)\n${flamme} - [Lance Flamme](https://galaxylife.fandom.com/wiki/Flame_Thrower)\n${bazooka} - [Bazooka](https://galaxylife.fandom.com/wiki/Bazooka)\n${kami} - [Kamikaze](https://galaxylife.fandom.com/wiki/Kamikaze)\n${starlin} - [Starlinator](https://galaxylife.fandom.com/wiki/Starlinator)\n${esquade} - [Esquade](https://galaxylife.fandom.com/wiki/Smasher_Squad)\n${bérets} - [Bérets vert](https://galaxylife.fandom.com/wiki/Green_Beret)`
    )
    .addField(
      `${colosse} - Véhiculée:`,
      `${strikes} - [S-Trikes](https://galaxylife.fandom.com/wiki/S-Trike)\n${tank} - [Tank](https://galaxylife.fandom.com/wiki/Beetle_Tank)\n${raider} - [Raider](https://galaxylife.fandom.com/wiki/Raider)\n${taupe} - [Taupe](https://galaxylife.fandom.com/wiki/The_Mole)\n${colosse} - [Colosse](https://galaxylife.fandom.com/wiki/Colossus)`
    )
    .addField(
      `${zep} - Aérienne:`,
      `${guepe} - [Guêpe](https://galaxylife.fandom.com/wiki/Wasp)\n${ovni} - [Ovni Aspirateur](https://galaxylife.fandom.com/wiki/Hoover_UFO)\n${falcon} - [Falcon](https://galaxylife.fandom.com/wiki/Falcon)\n${zep} - [Zeppelin](https://galaxylife.fandom.com/wiki/Zeppelin)`
    )
    .setFooter(`No Limit | Wiki - Troupes`, bot.user.displayAvatarURL());

  message.channel.send(embed);
};

module.exports.help = {
  name: "troupes",
  aliases: ["troupe"],
  category: "📜 - wiki",
  description: "Renvoie les infos sur GLR",
  usage: "",
};
