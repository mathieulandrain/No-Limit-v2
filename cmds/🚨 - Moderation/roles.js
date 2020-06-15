const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  console.log("Etape 1");
  let RolesEmbed = new Discord.MessageEmbed()
    .setTitle("Règlement - Alliance No Limit")
    .setThumbnail(message.guild.iconURL())
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
        ":small_orange_diamond: - Si quelqu'un enfreint ces règles, pingez @ @Commandant.\n" +
        ":small_orange_diamond: - Les Modérateurs auront toujours le dernier mot.\n" +
        ":pushpin: - Utilise Ctrl + P pour voir les messages épinglés.\n\n" +
        ":white_check_mark: Pour valider votre lecture de ce règlement cliquez sur <:Validation:702767205137252384>.\n" +
        "Vous serez ainsi compter comme personne en cours de validation soit attentif au #Vérification c'est ici qu'on vous contactera pour valider ta candidature. Merci aux membres de ne pas réagir ici."
    )
    .setFooter(`No Limit - Validation `, bot.user.displayAvatarURL());
  console.log("Etape 2");
  message.channel.send(RolesEmbed).then(async (msg) => {
    msg.react("702767205137252384");
  });
};

module.exports.help = {
  name: "Validation",
  aliases: ["valid"],
  category: "🚨 - moderation",
  description: "Met la réaction pour la validation",
  usage: "",
};
