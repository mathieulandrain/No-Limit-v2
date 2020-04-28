const Discord = require("discord.js");
const colours = require("../colours.json");
const ms = require("ms");

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
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!mutee)
    return message.channel.send("Veuillez mentionner la personne à mute.");

  let reason = args.slice(2).join(" ");
  if (!reason) reason = "Aucune raison donnée";

  let muterole = message.guild.roles.find((r) => r.name === "Muted");
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Muted",
        color: colours.red_dark,
        permissions: [],
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          READ_MESSAGES: true,
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  let muteTime = args[1];
  if (!muteTime) return message.channel.send("Spécifier la durée.");

  await mutee.addRole(muterole.id).then(() => {
    message.delete();

    let MuteEmbed = new Discord.MessageEmbed()
      .setDescription(
        `TEMPMUTED - Vous avez été tempmute dans le serveur \`${message.guild.name}\` avec comme raison : **${reason} pour une durée de : **${muteTime}.****`
      )
      .setColor(colours.orange);

    mutee.send(MuteEmbed).catch((err) => console.log(err));
    let TempMuteLogEmbed = new Discord.MessageEmbed()
      .setColor(colours.red_dark)
      .addField(
        "TempMute",
        `${mutee.user.tag} à été mute pour **${reason}** pendant **${muteTime}.**`
      )
      .setFooter(`No Limit - TempMute`, bot.user.displayAvatarURL);
    message.channel.send(TempMuteLogEmbed);
  });

  let MuteLogEmbed = new Discord.MessageEmbed()
    .setColor(colours.orange)
    .setAuthor(`${message.guild.name} LOG`, message.guild.iconURL)
    .addField("Moderation :", "**TEMPMUTE**")
    .addField("Utilisateur ayant été tempmute", mutee.user.username)
    .addField("Utilisateur ayant tempmute", message.author.tag)
    .addField("Raison", reason)
    .addField("Pendant :", muteTime);

  let lChannel = message.guild.channels.find((c) => c.name === "logs");
  lChannel.send(MuteLogEmbed);

  setTimeout(() => {
    mutee.removeRole(muterole.id);
    message.channel.send(`${mutee.user.tag} n'est plus mute.`);
    let TempMuteEmbed = new Discord.MessageEmbed()
      .setDescription(
        `UNMUTED - Vous avez été unmute dans le serveur \`${message.guild.name}\` avec comme raison : **${reason}.**`
      )
      .setColor(colours.green_dark);

    mutee.send(TempMuteEmbed);
  }, ms(muteTime));
};

module.exports.help = {
  name: "tempmute",
};
