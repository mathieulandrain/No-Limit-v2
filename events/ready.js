const Discord = require("discord.js");
const bot = new Discord.Client();
const { token, prefix } = require("../config.json");
// require("./util/eventHandler")(bot);

bot.commands = new Discord.Collection();

bot.login(token);

// const loadCommands = (dir = "./cmds/") => {
//  readdirSync(dir).forEach((dirs) => {
//    const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
//      files.endsWith(".js")
//    );

//    for (const file of commands) {
//      const getFileName = require(`${dir}/${dirs}/${file}`);
//      bot.commands.set(getFileName.help.name, getFileName);
//      console.log(`Commande chargée: ${getFileName.help.name}`);
//    }
//  });
//};

//const loadEvents = (dir = "./events/") => {
//  readdirSync(dir).forEach((dirs) => {
//    const events = readdirSync(`${dir}/`).filter((files) =>
//      files.endsWith(".js")
//    );

//    for (const event of events) {
//      const evt = require(`${dir}/${event}`);
//      const evtName = event.split(".")[0];
//      bot.on(evtName, evt.bind(null, bot));
//      console.log(`Evenement chargé: ${evtName}`);
//    }
//  });
//};

//loadEvents();
//loadCommands();

module.exports = async (bot) => {
  console.log(`(NoLimitv2): En ligne`);

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
