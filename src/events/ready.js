const fs = require("fs");
const path = require("path");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    // Load commands into client.commands
    client.commands = new Map();
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));
      client.commands.set(command.data.name, command);
    }

    console.log("Commands loaded:", [...client.commands.keys()]);
  },
};