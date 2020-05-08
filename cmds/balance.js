const Discord = require("discord.js");
const utip = require("utip.io");

module.exports.run = async (bot, message, args) => {
  (async () => {
    message.channel.send("Chargement des informations... (60 secondes)");
    let information = await utip.utipInfo("1018088e1cdf80a48b21e42573932624"); // 1018088e1cdf80a48b21e42573932624 -> c'est ton ID Utip
    message.channel.send(`J'ai actuellement ${information.balance}€ !`);
  })();
};
module.exports.help = {
  name: "balanceutip",
};
