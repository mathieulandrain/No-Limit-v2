const Discord = require("discord.js");
const weather = require("weather-js");

module.exports.run = async (bot, message, args) => {
  weather.find({ search: args.join(" "), degreeType: "C" }, function (
    error,
    result
  ) {
    if (error) return message.channel.send(error);
    if (!args[0]) return message.channel.send("Spécifier un endroit");

    if (result === undefined || result.length === 0)
      return message.channel.send("Endroit **Invalide**");

    var current = result[0].current;
    var location = result[0].location;

    const weatherinfo = new Discord.MessageEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Météo pour ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor("#ff2050")
      .addField("Fuseau horaire", `UTC${location.timezone}`, true)
      .addField("Température", `${current.temperature}°C`, true)
      .addField("Vent", current.winddisplay, true)
      .addField("Ressentie", `${current.feelslike}°C`, true)
      .addField("Humidité", `${current.humidity}%`, true);

    message.channel.send(weatherinfo);
  });
};
module.exports.help = {
  name: "météo",
  aliases: ["meteo"],
  category: "📌- misc",
  description: "Informe la météo",
  usage: "+ ville",
};
