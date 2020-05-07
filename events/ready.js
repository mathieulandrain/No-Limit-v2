const Discord = require("discord.js");

module.exports = (bot) => {
  console.log(`(NoLimitv2): En ligne`);

  let statuses = ["!help", `En ligne sur ${bot.guilds.cache.size} serveurs`];

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, { type: "WATCHING" });
  }, 5000);

  let myGuild = bot.guilds.cache.get("683734629945311349");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get("702666918322241547");
  memberCountChannel.setName(`Nous sommes: ` + memberCount);
};
