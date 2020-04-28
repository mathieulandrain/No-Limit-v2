const Discord = require("discord.js");
const colours = require("../colours.json");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send("Generating...");
  let { body } = await superagent.get(
    `https://dog.ceo/api/breeds/image/random`
  );
  //console.log(body.message)
  if (!{ body }) return message.channel.send("Mince! Essai encore");

  let Embed = new Discord.MessageEmbed()
    .setColor(colours.green_light)
    .setAuthor(`No Limit DOGS !`, message.guild.iconURL)
    .setImage(body.message)
    .setTimestamp()
    .setFooter(`No Limit DOGS`, bot.user.displayAvatarURL);
  message.channel.send(Embed).then((m) => m.delete(5000));
  msg.delete();
};

module.exports.help = {
  name: "dog",
};
