const { MessageEmbed } = require("discord.js");
const { logchanID } = require("../config.json");
const emotes = require("../assets/json/emotes.json");
const colours = require("../assets/json/colours.json");

module.exports = (bot, member) => {
  const embed = new MessageEmbed()
    .setAuthor(`${member.displayName}`, bot.user.displayAvatarURL())
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`${emotes.add} - <@${member.id}> a rejoins le serveur.`)
    .setColor(colours.green_light)
    .setFooter("Un utilisateur a rejoint")
    .setTimestamp();

  bot.channels.cache.get(`${logchanID}`).send(embed);
};
