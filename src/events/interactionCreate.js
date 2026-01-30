export default {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const commands = interaction.client.commands;
    if (!commands) {
      await interaction.reply({
        content: "Bot commands are not loaded (client.commands is missing).",
        ephemeral: true,
      });
      return;
    }

    const command = commands.get(interaction.commandName);
    if (!command) {
      await interaction.reply({
        content: `Unknown command: ${interaction.commandName}`,
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Something went wrong :(",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Something went wrong :(",
          ephemeral: true,
        });
      }
    }
  },
};

