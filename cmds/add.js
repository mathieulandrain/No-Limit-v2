const Discord = require("discord.js");
const colours = require("../colours.json");

module.exports.run = async (bot, message, args) => {
  let addrole = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  let role = message.guild.roles.cache.find((r) => r == args[0]);
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Tu n'a pas la permission !");
  }
  if (!addrole) {
    return message.channel.send("**Personne non trouvée.**");
  }
  if (role) {
    if (message.member.roles.cache.has(role.id))
      return message.channel.send(
        "Cette personne à déjà ce rôle! Essayez à nouveau!"
      );
    message.member.roles
      .add(role)
      .then((m) =>
        message.channel.send(`${addrole} possédez maintenant le role ${role}.`)
      )
      .catch((e) => console.log(e));
  } else {
    message.channel.send("Le rôle n'existe pas!");
  }
};

module.exports.help = {
  name: "addrole",
};
