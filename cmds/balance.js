const Discord = require("discord.js");
const utip = require("utip.io");
const puppeteer = require("puppeteer");

module.exports.run = async (bot, message, args) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  message.channel.send("Chargement des informations... (60 secondes)");
  let information = await utip.utipInfo("1018088e1cdf80a48b21e42573932624");
  console.log(information);
  message.channel.send(
    `Nous avons récolté **${information.balance}** sur un objectif de **${information.goal$amount}** ! \nTout ceux qui on participez envoyez un message au <@&708354922319708250> pour avoir le rôle <@&708258240718307420>.`
  );
  let myGuild = bot.guilds.cache.get("683734629945311349");
  let utipCount = information.balance;
  let goalCount = information.goal$amount;
  let utipCountChannel = myGuild.channels.cache.get("708403262054989834");
  utipCountChannel.setName(`💸Nous avons: ${utipCount}`);
  let goalCountChannel = myGuild.channels.cache.get("708403311623274516");
  goalCountChannel.setName(`🎯Objectif: ${goalCount}`);
};
module.exports.help = {
  name: "balanceutip708403262054989834",
};
