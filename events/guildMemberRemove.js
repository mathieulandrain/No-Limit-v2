const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = (bot, member) => {
  const embed = new MessageEmbed()
    .setAuthor(`${member.displayName}`, bot.user.displayAvatarURL())
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(
      `${emotes.remove} - ${member.displayName} a quitté le serveur.`
    )
    .setColor(colours.red_light)
    .setFooter("Un utilisateur a quitté")
    .setTimestamp();

  bot.channels.cache.get(`${logchanID}`).send(embed);
};
