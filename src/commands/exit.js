import { SlashCommandBuilder } from "discord.js";
import { activeTrivia } from "../helpers/activeTrivia.js";
//import { act } from "react";

export default {
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Exit this round of trivia ✈️"),

  async execute(interaction) {
    const userId = interaction.user.id;
    const session = activeTrivia.get(userId);



    if (!session) {
        return interaction.reply({ content: "No active trivia session! 🤨", flags: 64 });
    }

    session.exiting = true;
    activeTrivia.set(userId, session); // Update session to mark as existing

    // STOP the collector. This triggers the 'end' event in trivia.js
    if (session.collector) {
        session.collector.stop('user_exited');
    }

    if(session.optionCollector){
      session.optionCollector.stop('user_exited');
    }

    //activeTrivia.delete(userId); // Removed this for bonus round

    // Just acknowledge the exit
    return interaction.reply({ content: "Ending your trivia session...😤", flags: 64 });
  },
};
