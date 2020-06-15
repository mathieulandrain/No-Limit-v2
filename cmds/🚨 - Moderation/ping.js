const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send("Pinging...").then((m) => {
    let ping = m.createdTimeStamp - message.createdTimeStamp;
    let choices = ["Mon vrai ping est", "Je suis ok, regarde ça"];
    let response = choices[Math.floor(Math.random() * choices.length)];

    m.edit(
      `${response}: Bot Latency: \`${
        bot.ws.ping
      }\`, API Latency: \`${Math.round(bot.ws.ping)}\``
    );
  });
};
module.exports.help = {
  name: "ping",
  aliases: ["pg"],
  category: "🚨 - moderation",
  description: "Connaître la latence du bot",
  usage: "",
};
