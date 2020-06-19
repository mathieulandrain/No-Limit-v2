const { MessageEmbed } = require("discord.js");
const colours = require("../../assets/json/colours.json");
const emotes = require("../../assets/json/emotes.json");

module.exports.run = (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor(colours.green_light)
    .setTitle(`${emotes.building} - Bâtiments`)
    .setThumbnail(bot.user.avatarURL())
    .setDescription(`Ici vous aurez accès aux pages pour les bâtiments.`)
    .addField(
      `${emotes.généraux} - Bâtiments Généraux:`,
      `${emotes.base} - [Base](https://galaxylife.fandom.com/wiki/Star_Base)\n${emotes.labo} - [Laboratoire](https://galaxylife.fandom.com/wiki/Laboratory)\n${emotes.obso} - [Observatoire](https://galaxylife.fandom.com/wiki/Observatory)\n${emotes.académie} - [Académie](https://galaxylife.fandom.com/wiki/Academy)`
    )
    .addField(
      `${emotes.ressources} - Ressources:`,
      `${emotes.maison} - [Maison](https://galaxylife.fandom.com/wiki/Compact_House)\n${emotes.mine} - [Mine](https://galaxylife.fandom.com/wiki/Mine)\n${emotes.banque} - [Banque](https://galaxylife.fandom.com/wiki/Bank)\n${emotes.silo} - [Silo](https://galaxylife.fandom.com/wiki/Silo)\n${emotes.raffinerie} - [Raffinerie](https://galaxylife.fandom.com/wiki/Refinery)`
    )
    .addField(
      `${emotes.militaire} - Militaire:`,
      `${emotes.camp} - [Camp de formation](https://galaxylife.fandom.com/wiki/Training_Camp)\n${emotes.usine} - [Usine](https://galaxylife.fandom.com/wiki/Factory)\n${emotes.port} - [Port Spacial](https://galaxylife.fandom.com/wiki/Starport)\n${emotes.portail} - [Portail](https://galaxylife.fandom.com/wiki/Warp_Gate)`
    )
    .addField(
      `${emotes.défense} - Défenses:`,
      `${emotes.canon} - [Canon](https://galaxylife.fandom.com/wiki/Cannon_Blast)\n${emotes.snipe} - [Tour sniper](https://galaxylife.fandom.com/wiki/Sniper_Tower)\n${emotes.aa} - [Anti Aérien](https://galaxylife.fandom.com/wiki/Missile_Launcher)\n${emotes.laser} - [Tour Laser](https://galaxylife.fandom.com/wiki/Laser_Tower)\n${emotes.mortier} - [Mortier](https://galaxylife.fandom.com/wiki/Mortar)\n${emotes.gel} - [Tour de Gel](https://galaxylife.fandom.com/wiki/Freeze_Turret)\n${emotes.bunkercoop} - [Bunker Coopératif](https://galaxylife.fandom.com/wiki/Friends_Bunker)\n${emotes.bunker} - [Bunker](https://galaxylife.fandom.com/wiki/Defense_Bunker)\n${emotes.murs} - [Murs](https://galaxylife.fandom.com/wiki/Walls)\n${emotes.piège} - [Pièges](https://galaxylife.fandom.com/wiki/Traps)`
    )
    .addField(
      `${emotes.deco} - Décoration:`,
      `${emotes.deco} - [Décoration](https://galaxylife.fandom.com/wiki/Decorations)`
    )
    .setFooter(`No Limit | Wiki - Bâtiments`, bot.user.displayAvatarURL());

  message.channel.send(embed);
};

module.exports.help = {
  name: "bâtiments",
  aliases: ["batiments", "bâtiment", "batiment"],
  category: "📜 - wiki",
  description: "Renvoie les infos sur GLR",
  usage: "",
};
