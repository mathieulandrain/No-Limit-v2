const { readdirSync, readdir } = require("fs");
const path = require("path");

const loadCommands = (bot, dir = "./cmds") => {
  readdirSync(dir).forEach((dirs) => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith(".js")
    );

    for (const file of commands) {
      const getFileName = require(`../${dir}/${dirs}/${file}`);
      bot.commands.set(getFileName.help.name, getFileName);
      console.log(`Commande: ${getFileName.help.name} Ok`);
    }
  });
};

const loadEvents = (bot) => {
  readdir(path.resolve(__dirname, "../events"), (err, files) => {
    // Permet de d'afficher une erreure lorsqu'il y a un probléme dans le fichier event
    if (err) return console.log(err);
    files.forEach((file) => {
      const event = require(path.resolve(__dirname, `../events//${file}`)); // Permet lire toute les commande de notre fichier event
      const eventName = file.split(".")[0]; // Prend les noms des commande du ficher event
      bot.on(eventName, event.bind(null, bot));
      console.log(`Events: ${eventName} Ok`);
    });
  });
};

module.exports = {
  loadCommands,
  loadEvents,
};
