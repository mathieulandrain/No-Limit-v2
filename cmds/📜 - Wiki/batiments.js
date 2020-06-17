const { MessageEmbed } = require("discord.js");
const { version } = require("../../package.json");
const colours = require("../../colours.json");
const {
  base,
  labo,
  obso,
  académie,
  building,
  ressources,
  maison,
  mine,
  banque,
  silo,
  raffinerie,
  militaire,
  généraux,
  usine,
  camp,
  port,
  portail,
  défense,
  canon,
  snipe,
  aa,
  laser,
  mortier,
  gel,
  bunker,
  bunkercoop,
  murs,
  piège,
  deco,
} = require("../../emotes.json");
const { prefix } = require("../../config.json");

module.exports.run = (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor(colours.green_light)
    .setTitle(`${building} - Bâtiments`)
    .setThumbnail(bot.user.avatarURL())
    .setDescription(`Ici vous aurez accès aux pages pour les bâtiments.`)
    .addField(
      `${généraux} - Bâtiments Généraux:`,
      `${base} - [Base](https://galaxylife.fandom.com/wiki/Star_Base)\n${labo} - [Laboratoire](https://galaxylife.fandom.com/wiki/Laboratory)\n${obso} - [Observatoire](https://galaxylife.fandom.com/wiki/Observatory)\n${académie} - [Académie](https://galaxylife.fandom.com/wiki/Academy)`
    )
    .addField(
      `${ressources} - Ressources:`,
      `${maison} - [Maison](https://galaxylife.fandom.com/wiki/Compact_House)\n${mine} - [Mine](https://galaxylife.fandom.com/wiki/Mine)\n${banque} - [Banque](https://galaxylife.fandom.com/wiki/Bank)\n${silo} - [Silo](https://galaxylife.fandom.com/wiki/Silo)\n${raffinerie} - [Raffinerie](https://galaxylife.fandom.com/wiki/Refinery)`
    )
    .addField(
      `${militaire} - Militaire:`,
      `${camp} - [Camp de formation](https://galaxylife.fandom.com/wiki/Training_Camp)\n${usine} - [Usine](https://galaxylife.fandom.com/wiki/Factory)\n${port} - [Port Spacial](https://galaxylife.fandom.com/wiki/Starport)\n${portail} - [Portail](https://galaxylife.fandom.com/wiki/Warp_Gate)`
    )
    .addField(
      `${défense} - Défenses:`,
      `${canon} - [Canon](https://galaxylife.fandom.com/wiki/Cannon_Blast)\n${snipe} - [Tour sniper](https://galaxylife.fandom.com/wiki/Sniper_Tower)\n${aa} - [Anti Aérien](https://galaxylife.fandom.com/wiki/Missile_Launcher)\n${laser} - [Tour Laser](https://galaxylife.fandom.com/wiki/Laser_Tower)\n${mortier} - [Mortier](https://galaxylife.fandom.com/wiki/Mortar)\n${gel} - [Tour de Gel](https://galaxylife.fandom.com/wiki/Freeze_Turret)\n${bunkercoop} - [Bunker Coopératif](https://galaxylife.fandom.com/wiki/Friends_Bunker)\n${bunker} - [Bunker](https://galaxylife.fandom.com/wiki/Defense_Bunker)\n${murs} - [Murs](https://galaxylife.fandom.com/wiki/Walls)\n${piège} - [Pièges](https://galaxylife.fandom.com/wiki/Traps)`
    )
    .addField(
      `${deco} - Décoration:`,
      `${deco} - [Décoration](https://galaxylife.fandom.com/wiki/Decorations)`
    )
    .setFooter(`No Limit | Wiki - Bâtiments`, bot.user.displayAvatarURL());

  message.channel.send(embed);
};

module.exports.help = {
  name: "bâtiments",
  aliases: [`batiments`, `bâtiment`, `batiment`],
  category: "📜 - Wiki",
  description: "Renvoie les infos sur GLR",
  usage: "",
};
