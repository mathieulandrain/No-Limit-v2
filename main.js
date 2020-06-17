const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const { readdirSync } = require("fs");
const superagent = require("superagent");
const bot = new Discord.Client();
const {
  token,
  prefix,
  BOT_ID,
  memberCountChannelID,
  AccueilChanID,
  RecrueID,
  TicketID,
  ChanValidID,
  RoleValidID,
} = require("./config.json");
const colours = require("./colours.json");
const moment = require("moment");
const { loadCommands, loadEvents } = require("./util/loader");
moment.locale("fr");
const cdseconds = 5;

bot.commands = new Discord.Collection();

loadCommands(bot);
loadEvents(bot);

bot.login(token);

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
  let ChannelValid = bot.channels.cache.get("693445781977301023");

  ChannelValid.bulkDelete(100);

  let mess = new Discord.MessageEmbed()
    .setTitle("Info - Alliance No Limit")
    .setColor(colours.orange)
    .setDescription(
      "**Info utile lors de l'arrivé:**\n" +
        "🔸 - Pour des raisons de sécurité vous avez accès uniquement à ce channel dans un premier temps.\n" +
        "🔸 - Lisez bien le règlement et cliquez sur la réaction pour avoir le rôle de validation qui vous donnera accès à un autre channel où vous pourrez parler avec les <@&683734990005075973> et les <@&683734915732340982> pour devenir officiellement un membre de notre Alliance ! \n" +
        "🔸 - Bonne lecture et à bientôt dans le chat des membres."
    )
    .setFooter(`No Limit - Info `, bot.user.displayAvatarURL());
  ChannelValid.send(mess);

  let RolesEmbed = new Discord.MessageEmbed()
    .setTitle("Règlement - Alliance No Limit")
    .setColor("#2ac075")
    .setDescription(
      "**Règles:**\n" +
        ":small_orange_diamond: - Pas de NSFW, de racisme, de sexisme, de harcèlement.\n" +
        ":small_orange_diamond: - Évitez de spam, quel que soit le channel.\n" +
        ":small_orange_diamond: - Les modificateurs de voix sont interdits.\n" +
        ":small_orange_diamond: - Publicité interdite pour les serveurs discord.\n" +
        ":small_orange_diamond: - Pas de liens vers des sites douteux / inconnus.\n" +
        ":small_orange_diamond: - Évitez tout sujet polémique. (religion, politique...)\n\n" +
        "**Infos:**\n" +
        ":small_orange_diamond: - Prêtez attention à la description des channels.\n" +
        ":small_orange_diamond: - Si quelqu'un enfreint ces règles, pingez <@&698301852810477599>.\n" +
        ":small_orange_diamond: - Les Modérateurs auront toujours le dernier mot.\n" +
        ":pushpin: - Utilise Ctrl + P pour voir les messages épinglés.\n\n" +
        ":white_check_mark: Pour valider votre lecture de ce règlement cliquez sur <:Validation:702767205137252384>.\n" +
        "Vous serez ainsi compter comme personne en cours de validation soit attentif au #Vérification c'est ici qu'on vous contactera pour valider ta candidature. Merci aux membres de ne pas réagir ici."
    )
    .setFooter(`No Limit - Validation `, bot.user.displayAvatarURL());
  ChannelValid.send(RolesEmbed).then(async (msg) => {
    msg.react("702767205137252384");
  });
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  let commandFile =
    bot.commands.get(command.slice(prefix.length)) ||
    bot.commands.find(
      (cmd) =>
        cmd.help.aliases &&
        cmd.help.aliases.includes(command.slice(prefix.length))
    );
  console.log(bot.commands);
  if (commandFile) commandFile.run(bot, message, args, prefix);
});

bot.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.get(`${AccueilChanID}`);

  let myGuild = bot.guilds.cache.get(`${BOT_ID}`);
  let memberCount = myGuild.members.cache.filter((m) => !m.user.bot).size;
  let memberCountChannel = myGuild.channels.cache.get(
    `${memberCountChannelID}`
  );
  memberCountChannel.setName(`Nous sommes: ` + memberCount);

  let newEmbed = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL())
    .setColor(colours.green_light)
    .setDescription(`**Bienvenue à ${member} sur le serveur**`)
    .addField(`Nous sommes désormais:`, `${memberCount} membres`)
    .setFooter(`Nouveau - No Limit `, bot.user.displayAvatarURL());
  member.guild.channels.cache.get(`${AccueilChanID}`).send(newEmbed);

  let recrue = member.guild.roles.cache.get(`${RecrueID}`);
  member.roles.add(recrue);
});
bot.on("guildMemberRemove", (member) => {
  let removeEmbed = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL())
    .setColor(colours.red_dark)
    .setDescription(`**${member} nous a quitté...**`)
    .setFooter(`No Limit - Départ`, bot.user.displayAvatarURL());
  member.guild.channels.cache.get(`${AccueilChanID}`).send(removeEmbed);

  let myGuild = bot.guilds.cache.get(`${BOT_ID}`);
  let memberCount = myGuild.members.cache.filter((m) => !m.user.bot).size;
  let memberCountChannel = myGuild.channels.cache.get(
    `${memberCountChannelID}`
  );
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

        var categoryID = `${TicketID}`;
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
  if (messageReaction.message.channel.id != `${ChanValidID}`) return;
  const ValidationRoles = message.guild.roles.cache.get(`${RoleValidID}`);

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
