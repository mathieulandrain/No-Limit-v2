const Discord = require("discord.js");
const Canvas = require("canvas");
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
  let ChannelTicket = bot.channels.cache.get("702055849488810035");

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

  let myGuild = bot.guilds.cache.get("692564832284704819");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get("702094443515346964");
  memberCountChannel.setName(`Nous sommes: ` + memberCount);

  const Canvas = require("canvas");
  Canvas.registerFont("Anton-Regular.ttf", { family: "Anton" });

  const canvas = Canvas.createCanvas(1024, 450);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage("./nl.png");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000";
  ctx.strokeRect(8, 11, 1004, 430);

  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  ctx.font = '90px "Anton"';
  ctx.fillStyle = "#F7FF26";
  ctx.fillText("BIENVENUE", 260, 260);

  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  ctx.font = '60px "Anton"';
  ctx.fillStyle = "#0CFAFF";
  ctx.fillText(`@${member.displayName}!`, 290, 320);

  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  ctx.font = '40px "Anton"';
  ctx.fillStyle = "#1FFFF2";
  ctx.fillText(`Tu est le ${memberCount} ème soldats !`, 250, 370);

  const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  ctx.beginPath();

  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  ctx.arc(502, 118, 75, 0, Math.PI * 2, true);
  ctx.arc(502, 118, 40, 0, Math.PI * 2, true);
  ctx.fill("evenodd");
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 402, 18, 175, 175);

  const attachement = new Discord.Attachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );
  channel.send(attachement);

  let recrue = member.guild.roles.get("697182454607511652");
  member.addRole(recrue);
});
bot.on("guildMemberRemove", (member) => {
  let removeEmbed = new Discord.MessageEmbed()
    .setDescription(member.user.username + " **nous a quitté**")
    .setColor("RANDOM")
    .setFooter(`No Limit - Départ`, bot.user.displayAvatarURL());
  member.guild.channels.cache.get("702089385595764776").send(removeEmbed);

  let myGuild = bot.guilds.cache.get("692564832284704819");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get("702094443515346964");
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

        var categoryID = "702049107467829298";
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
  if (messageReaction.message.channel.id != "703007693056507924") return;
  const ValidationRoles = message.guild.roles.cache.get("702768286328160316");

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
