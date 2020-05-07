const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const fs = require("fs");
const superagent = require("superagent");
const bot = new Discord.Client();
const { token, prefix } = require("./config.json");
const colours = require("./colours.json");
const moment = require("moment");
moment.locale("fr");
const cdseconds = 5;

require("./util/eventHandler")(bot);

bot.commands = new Discord.Collection();

bot.login(token);

fs.readdir("./cmds/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Aucune commande trouver.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${f} Ok !`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  let ChannelTicket = bot.channels.cache.get("702666567460061204");

  ChannelTicket.bulkDelete(100);

  let TicketEmbed = new Discord.MessageEmbed()
    .setColor("#cd3")
    .setAuthor("Support du serveur")
    .setDescription("Pour créer un ticket, appuyez sur la réaction")
    .setFooter(
      `Support du serveur No Limit `,
      bot.user.displayAvatarURL("png", true)
    );

  ChannelTicket.send(TicketEmbed).then(async (msg) => {
    msg.react("🎟️");
  });
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  let commandFile = bot.commands.get(command.slice(prefix.length));
  if (commandFile) commandFile.run(bot, message, args, prefix);
});

bot.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get("683734629949505556");

  let myGuild = bot.guilds.cache.get("683734629945311349");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get("702666918322241547");
  memberCountChannel.setName(`Nous sommes: ` + memberCount);

  let newEmbed = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("RANDOM")
    .setDescription(`**Bienvenue à ${member} sur le serveur**`)
    .addField(`Nous sommes désormais:`, `${memberCount} membres`)
    .setFooter(`Nouveau - No Limit `, bot.user.displayAvatarURL());
  member.guild.channels.cache.get("683734629949505556").send(newEmbed);

  let recrue = member.guild.roles.cache.get("697182454607511652");
  member.roles.add(recrue);
});
bot.on("guildMemberRemove", (member) => {
  let removeEmbed = new Discord.MessageEmbed()
    .setDescription(member.user.username + " **nous a quitté**")
    .setColor("RANDOM")
    .setFooter(`No Limit - Départ`, bot.user.displayAvatarURL());
  member.guild.channels.cache.get("702665886569594981").send(removeEmbed);

  let myGuild = bot.guilds.cache.get("683734629945311349");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get("702666918322241547");
  memberCountChannel.setName(`Nous sommes: ` + memberCount);
});
bot.on("messageReactionAdd", (reaction, user) => {
  if (user.bot) return;
  const message = reaction.message;
  const member = message.guild.members.cache.get(user.id);
  const STAFF = message.guild.roles.cache.find(
    (role) => role.name === "TICKET"
  );
  const everyone = message.guild.roles.cache.find(
    (role) => role.name === "@everyone"
  );

  if (["🎟️", "🔒"].includes(reaction.emoji.name)) {
    switch (reaction.emoji.name) {
      case "🎟️":
        message.reactions.removeAll().then(() => {
          message.react("🎟️");
        });

        var TicketList = ["ticket-001", "ticket-002", "ticket-003"];

        let result = Math.floor(Math.random() * TicketList.length);

        var categoryID = "702666419044614154";
        if (!bot.channels.cache.get(categoryID)) {
          if (
            !bot.channels.cache.find(
              (c) => c.name == "ticket" && c.type == "category"
            )
          ) {
            message.guild.channels
              .create("ticket", { type: "category" })
              .then((c) => (categoryID = c.id));
          } else {
            categoryID = bot.channels.cache.find(
              (c) => c.name == "ticket" && c.type == "category"
            ).id;
          }
        }

        var bool = false;

        if (bool == true) return;

        message.guild.channels
          .create(TicketList[result], "text")
          .then((createChan) => {
            createChan.setParent(categoryID).then((settedParent) => {
              settedParent.updateOverwrite(everyone, {
                VIEW_CHANNEL: false,
              });

              settedParent.updateOverwrite(member, {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true,
                ATTACH_FILES: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true,
              });

              settedParent.updateOverwrite(STAFF, {
                VIEW_CHANNEL: true,
                MANAGE_MESSAGES: true,
              });

              let embedTicketOpen = new Discord.MessageEmbed()
                .setTitle("Bonjour,")
                .setColor("#cd3")
                .setDescription("Dîtes vos question / message ici")
                .setFooter(
                  `Support du serveur No Limit `,
                  bot.user.displayAvatarURL("png", true)
                );

              settedParent.send(embedTicketOpen).then(async (msg) => {
                await msg.react("🔒");
              });
            });
          });

        break;

      case "🔒":
        message.channel.send("**Le salon se fermera dans 10 secondes...**");

        setTimeout(() => {
          message.channel.delete();
        }, cdseconds * 1500);

        let embedTicketClose = new Discord.MessageEmbed()
          .setTitle(`Le ticket ${message.channel.name} a été fermer`)
          .setColor("#cd3")
          .setFooter(
            "Ticket Fermer Avertissement",
            bot.user.displayAvatarURL("png", true)
          );

        let logChannel = message.guild.channels.cache.find(
          (c) => c.name == "logs"
        );
        if (logChannel) {
          logChannel.send(embedTicketClose);
        }
        break;
    }
  }
});
bot.on("messageReactionAdd", (messageReaction, user) => {
  const message = messageReaction.message;
  const member = message.guild.members.cache.get(user.id);
  if (user.bot) return;
  if (messageReaction.message.channel.id != "693445781977301023") return;
  const ValidationRoles = message.guild.roles.cache.get("702919919490039901");

  if (messageReaction.emoji.name === "Validation") {
    console.log("Etape 6");
    member.roles.add(ValidationRoles.id);
    member.createDM().then((channel) => {
      channel.send(
        "Vous avez bien validé le règlement, restez attentif pour qu'on puisse vous valider et faire partie des membres ainsi qu'avoir accès à tout le serveur Discord."
      );
    });
  }
});
