const Discord = require("discord.js");
const colours = require("../../colours.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
    return message.channel.send(
      "Vous n'avez pas la permissions pour faire cette commande !"
    );
  if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
    return message.channel.send(
      "Veuillez m'ajoutez ces permissions `MANAGE_ROLES` + `ADMINISTRATOR` pour utilisez cette commande."
    );

  let mutee =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!mutee)
    return message.channel.send("Veuillez mentionner la personne à mute.");

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "Aucune raison donnée";

  let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Muted",
        color: colours.red_dark,
        permissions: [],
      });
      message.guild.channels
        .filter((channel) => channel.type === "text")
        .forEach(async (channel) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          });
        });
    } catch (e) {
      console.log(e.stack);
    }
  }
  mutee.roles.add(muterole.id).then(() => {
    message.delete();

    let MuteEmbed = new Discord.MessageEmbed()
      .setDescription(
        `MUTED - Vous avez été mute sur le serveur \`${message.guild.name}\` avec comme raison : **${reason}**`
      )
      .setColor(colours.orange);

    mutee.send(MuteEmbed).catch((err) => console.log(err));
    let MuuteLogEmbed = new Discord.MessageEmbed()
      .setColor(colours.red_dark)
      .addField("Mute", `${mutee.user.tag} à été mute pour **${reason}.**`)
      .setFooter(`No Limit - Mute`, bot.user.displayAvatarURL());
    message.channel.send(MuuteLogEmbed);
  });

  let MuteLogEmbed = new Discord.MessageEmbed()
    .setColor(colours.orange)
    .setAuthor(`${message.guild.name} LOG`, message.guild.iconURL())
    .addField("Moderation :", "**MUTE**")
    .addField("Utilisateur ayant été mute", mutee.user.username)
    .addField("Utilisateur ayant mute", message.author.tag)
    .addField("Raison", reason);

  let lChannel = message.guild.channels.cache.find((c) => c.name === "logs");
  lChannel.send(MuteLogEmbed);
};

module.exports.help = {
  name: "mute",
  aliases: ["mute"],
  category: "moderation",
  description: "Mute une personne.",
  usage: "+ @delapersonne + raison",
};
