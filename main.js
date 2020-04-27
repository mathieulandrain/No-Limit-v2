const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const fs = require("fs");
const superagent = require("superagent");
const bot = new Discord.Client();
const config = require("./config.json");
const colours = require("./colours.json");
const moment = require("moment");
moment.locale("fr");
const cdseconds = 5;

require("./util/eventHandler")(bot);

bot.commands = new Discord.Collection();

bot.login(config.token);

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
  let ChannelTicket = bot.channels.get("702666567460061204");

  ChannelTicket.bulkDelete(100);

  let TicketEmbed = new Discord.RichEmbed()
    .setColor("#cd3")
    .setAuthor("Support du serveur")
    .setDescription("Pour créer un ticket, appuyez sur la réaction")
    .setFooter(`Support du serveur No Limit `, bot.user.displayAvatarURL);

  ChannelTicket.send(TicketEmbed).then(async (msg) => {
    msg.react("🎟️");
  });
});
bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith("!")) return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  let commandFile = bot.commands.get(command.slice(prefix.length));
  if (commandFile) commandFile.run(bot, message, args);
});
bot.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.get("683734629949505556");

  let myGuild = bot.guilds.cache.get("683734629945311349");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get("702666918322241547");
  memberCountChannel.setName(`Nous sommes: ` + memberCount);

  const canvas = Canvas.createCanvas(1024, 450);
  const ctx = canvas.getContext("2d");
  Canvas.registerFont("./assets/airstrike.ttf", { family: "airstrike" });
  const background = await Canvas.loadImage("./nl.png");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000";
  ctx.strokeRect(8, 11, 1004, 430);

  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  ctx.font = "90px airstrike";
  ctx.fillStyle = "#F7FF26";
  ctx.fillText("BIENVENUE", 260, 260);

  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  ctx.font = "60px airstrike";
  ctx.fillStyle = "#0CFAFF";
  ctx.fillText(`@${member.displayName}!`, 290, 320);

  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  ctx.font = "40px airstrike";
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
  let removeEmbed = new Discord.RichEmbed()
    .setDescription(member.user.username + " **nous a quitté**")
    .setColor("RANDOM")
    .setFooter(`No Limit - Départ`, bot.user.displayAvatarURL);
  member.guild.channels.get("702665886569594981").sendMessage(removeEmbed);

  let myGuild = bot.guilds.cache.get("683734629945311349");
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get("702666918322241547");
  memberCountChannel.setName(`Nous sommes: ` + memberCount);
});
bot.on("messageReactionAdd", (reaction, user) => {
  if (user.bot) return;
  const message = reaction.message;
  const member = message.guild.members.get(user.id);
  const STAFF = message.guild.roles.find(`name`, "TICKET");
  const everyone = message.guild.roles.find(`name`, "@everyone");

  if (["🎟️", "🔒"].includes(reaction.emoji.name)) {
    switch (reaction.emoji.name) {
      case "🎟️":
        reaction.remove(user);

        var TicketList = ["ticket-001", "ticket-002", "ticket-003"];

        let result = Math.floor(Math.random() * TicketList.length);

        let categoryID = "702666419044614154";

        var bool = false;

        if (bool == true) return;

        message.guild
          .createChannel(TicketList[result], "text")
          .then((createChan) => {
            createChan.setParent(categoryID).then((settedParent) => {
              settedParent.overwritePermissions(everyone, {
                READ_MESSAGES: false,
              });

              settedParent.overwritePermissions(member, {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true,
                ATTACH_FILES: true,
                READ_MESSAGES: true,
                READ_MESSAGE_HISTORY: true,
              });

              settedParent.overwritePermissions(STAFF, {
                READ_MESSAGES: true,
                MANAGE_MESSAGES: true,
              });

              settedParent.overwritePermissions(member, {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true,
                ATTACH_FILES: true,
                READ_MESSAGES: true,
                READ_MESSAGE_HISTORY: true,
              });

              let embedTicketOpen = new Discord.RichEmbed()
                .setTitle("Bonjour,")
                .setColor("#cd3")
                .setDescription("Dîtes vos question / message ici")
                .setFooter(
                  `Support du serveur No Limit `,
                  bot.user.displayAvatarURL
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

        let embedTicketClose = new Discord.RichEmbed()
          .setTitle(`Le ticket ${message.channel.name} a été fermer`)
          .setColor("#cd3")
          .setFooter("Ticket Fermer Avertissement", bot.user.displayAvatarURL);

        let logChannel = message.guild.channels.find("name", "logs");

        logChannel.send(embedTicketClose);
        break;
    }
  }
});
bot.on("messageReactionAdd", (messageReaction, user) => {
  const message = messageReaction.message;
  const member = message.guild.members.get(user.id);
  if (user.bot) return;
  const ValidationRoles = message.guild.roles.get("702919919490039901");

  if (messageReaction.emoji.name === "Validation") {
    console.log("Etape 6");
    member.addRole(ValidationRoles.id);
    member.createDM().then((channel) => {
      channel.send(
        "Vous avez bien validez le règlement, restez attentif pour qu'on puisse vous validez et faire partis des membres ainsi avoir accès a tout le serveur Discord."
      );
    });
  }
});
