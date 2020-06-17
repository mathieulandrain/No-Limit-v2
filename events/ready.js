const Discord = require("discord.js");
const { BOT_ID, prefix, memberCountChannelID } = require("../config.json");

module.exports = async (bot) => {
  console.log(`(NoLimitv2): En ligne`);

  let statuses = [
    `${prefix}help`,
    `En ligne sur ${bot.guilds.cache.size} serveurs`,
  ];

  setInterval(function () {
    let statuses = [
      `${prefix}help`,
      `En ligne sur ${bot.guilds.cache.size} serveurs`,
    ];
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, { type: "WATCHING" });
    let myGuild = bot.guilds.cache.get(`${BOT_ID}`);
    let memberCount = myGuild.members.cache.filter((m) => !m.user.bot).size;
    let memberCountChannel = myGuild.channels.cache.get(
      `${memberCountChannelID}`
    );
    memberCountChannel.setName(`Nous sommes: ` + memberCount);
  }, 5000);
};
