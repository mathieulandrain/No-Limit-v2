const Discord = require("discord.js");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
  let addrole = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  let amount = message.content.slice(
    message.content.indexOf(message.content.split(" ")[1])
  );
  let role = message.guild.roles.cache.find((r) => r.name == args[1]);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Tu n'a pas la permission !");
  }
  if (!addrole) {
    return message.channel.send("**Personne non trouvée.**");
  }
  if (!role) {
    return message.channel.send("Ce rôle n'a pas été trouvé");
  } else {
    if (message.member.roles.cache.has(role.id))
      return message.channel.send(
        "Cette personne à déjà ce rôle! Essayez à nouveau!"
      );
    addrole.roles
      .add(role.id)
      .then((m) =>
        message.channel.send(
          `${addrole} possédez maintenant le role ${role.name}.`
        )
      )
      .catch((e) => console.log(e));
  }
};

module.exports.help = {
  name: "addrole",
};
