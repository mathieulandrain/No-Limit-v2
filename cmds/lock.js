const Discord = require("discord.js");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
  if (!bot.lockit) bot.lockit = [];
  let validUnlocks = ["release", "unlock"];

  if (validUnlocks.includes()) {
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null,
      })
      .then(() => {
        message.channel.send("Le salon est réouvert !");
      });
  } else {
    message.channel
      .overwritePermissions(message.guild.id, {
        READ_MESSAGES: false,
      })
      .then(() => {
        message.channel.send("Le salon est fermer !");
      });
  }
};

module.exports.help = {
  name: "lock",
};
