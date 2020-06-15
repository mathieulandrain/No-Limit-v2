const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");
const { readdirSync } = require("fs");
const categoryList = readdirSync("./cmds");

module.exports.run = (bot, message, args) => {
  if (!args.length) {
    const embed = new MessageEmbed()
      .setColor("#a1ee33")
      .addField(
        "Liste des commandes",
        `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command_name>\`.`
      );

    for (const category of categoryList) {
      console.log(
        bot.commands
          .filter((cat) => cat.help.category === category.toLowerCase())
          .map((cmd) => cmd.help.name)
      );
      embed.addField(
        `${category}`,
        `${bot.commands
          .filter((cat) => cat.help.category === category.toLowerCase())
          .map((cmd) => cmd.help.name)
          .join(", ")}`
      );
    }

    return message.channel.send(embed);
  } else {
    const command =
      bot.commands.get(args[0]) ||
      bot.commands.find(
        (cmd) => cmd.help.aliases && cmd.help.aliases.includes(args[0])
      );
    console.log(command);
    if (!command) return message.reply("cette commande n'existe pas!");

    const embed = new MessageEmbed()
      .setColor("#a1ee33")
      .setTitle(`\`${command.help.name}\``)
      .addField("- Description", `${command.help.description}`)
      .addField(
        "- Utilisation",
        command.help.usage
          ? `${prefix}${command.help.name} ${command.help.usage}`
          : `${prefix}${command.help.name}`,
        true
      )
      .addField("- Alias", `${command.help.aliases}`);

    if (command.help.aliases.length > 1)
      embed.addField("Alias", `${command.help.aliases.join(", ")}`, true);
    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  aliases: ["help"],
  category: "misc",
  description:
    "Renvoie une liste de commandes ou les informations sur une seule!",
  usage: "<command_name>",
};
