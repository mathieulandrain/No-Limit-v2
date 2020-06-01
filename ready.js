const Discord = require("discord.js");
const bot = new Discord.Client();
const utip = require("utip.io");

module.exports = (bot) => {
  console.log(`(NoLimit): En ligne`);

  let statuses = ["!help", `En ligne sur ${bot.guilds.cache.size} serveurs`];

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, { type: "WATCHING" });
    let myGuild = bot.guilds.cache.get("692564832284704819");
    let memberCount = myGuild.members.cache.filter((m) => !m.user.bot).size;
    let memberCountChannel = myGuild.channels.cache.get("702094443515346964");
    memberCountChannel.setName(`Nous sommes: ` + memberCount);
  }, 5000);
};
