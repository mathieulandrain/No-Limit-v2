const { MessageEmbed } = require("discord.js");
const colours = require("../../assets/json/colours.json");
const emotes = require("../../assets/json/emotes.json");

module.exports.run = (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor(colours.green_light)
    .setTitle(`${emotes.colosse} - Troupes`)
    .setThumbnail(bot.user.avatarURL())
    .setDescription(`Ici vous aurez accès aux pages pour les troupes.`)
    .addField(
      `${emotes.starlin} - Infanterie:`,
      `${emotes.marine} - [Marine](https://galaxylife.fandom.com/wiki/Marine)\n${emotes.pilleur} - [Pilleur](https://galaxylife.fandom.com/wiki/Looter)\n${emotes.flamme} - [Lance Flamme](https://galaxylife.fandom.com/wiki/Flame_Thrower)\n${emotes.bazooka} - [Bazooka](https://galaxylife.fandom.com/wiki/Bazooka)\n${emotes.kami} - [Kamikaze](https://galaxylife.fandom.com/wiki/Kamikaze)\n${emotes.starlin} - [Starlinator](https://galaxylife.fandom.com/wiki/Starlinator)\n${emotes.esquade} - [Esquade](https://galaxylife.fandom.com/wiki/Smasher_Squad)\n${emotes.bérets} - [Bérets vert](https://galaxylife.fandom.com/wiki/Green_Beret)`
    )
    .addField(
      `${emotes.colosse} - Véhiculée:`,
      `${emotes.strikes} - [S-Trikes](https://galaxylife.fandom.com/wiki/S-Trike)\n${emotes.tank} - [Tank](https://galaxylife.fandom.com/wiki/Beetle_Tank)\n${emotes.raider} - [Raider](https://galaxylife.fandom.com/wiki/Raider)\n${emotes.taupe} - [Taupe](https://galaxylife.fandom.com/wiki/The_Mole)\n${emotes.colosse} - [Colosse](https://galaxylife.fandom.com/wiki/Colossus)`
    )
    .addField(
      `${emotes.zep} - Aérienne:`,
      `${emotes.guepe} - [Guêpe](https://galaxylife.fandom.com/wiki/Wasp)\n${emotes.ovni} - [Ovni Aspirateur](https://galaxylife.fandom.com/wiki/Hoover_UFO)\n${emotes.falcon} - [Falcon](https://galaxylife.fandom.com/wiki/Falcon)\n${emotes.zep} - [Zeppelin](https://galaxylife.fandom.com/wiki/Zeppelin)`
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
