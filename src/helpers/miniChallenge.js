import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { questions } from "../questions.js";
import { activeTrivia } from "./activeTrivia.js";

export async function offerMiniChallenge(interaction, currentScore, currentCategory) {
  const userId = interaction.user.id;
  const session = activeTrivia.get(userId);
  if (!session) return { points: currentScore, sessionData: session };

  const challengeType = Math.random() < 0.5 ? "popQuiz" : "doublePoints";
  let challenge;
  if (challengeType === "popQuiz") {
    const randomIndex = Math.floor(Math.random() * questions.length);
    challenge = { ...questions[randomIndex], points: 1 };
  } else {
    const categoryQuestions = questions.filter(q => q.category === currentCategory);
    if (categoryQuestions.length === 0) return { points: currentScore, sessionData: session };
    const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    challenge = { ...categoryQuestions[randomIndex], points: 2 };
  }

  const typeLabel = challengeType === "popQuiz" ? "Pop Quiz" : "Double Points!";
  const offerEndTime = Math.floor(Date.now() / 1000) + 30;

  const bonusEmbed = new EmbedBuilder()
    .setTitle("🎁 BONUS ROUND!")
    .setDescription(`Do you want to attempt a bonus question?\n\n⏰ **Decision ends:** <t:${offerEndTime}:R>`)
    .addFields({ name: "Question Type", value: typeLabel, inline: true })
    .setImage("https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif")
    .setColor("#FFD700");

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("accept_mini").setLabel("Accept").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("decline_mini").setLabel("Decline").setStyle(ButtonStyle.Danger)
  );

  const message = await interaction.followUp({ embeds: [bonusEmbed], components: [row], fetchReply: true });

  return new Promise(resolve => {
    let resolved = false;
    const safeResolve = (points, sessionData = session) => {
      if (!resolved) {
        resolved = true;
        resolve({ points, sessionData });
      }
    };

    const collector = message.createMessageComponentCollector({ 
      filter: i => i.user.id === userId, 
      max: 1, 
      time: 30000 
    });

    collector.on("collect", async i => {
      await i.deferUpdate();
      const s = activeTrivia.get(userId);
      if (!s || s.exiting) return safeResolve(currentScore, s || session);

      // Clear timer from the initial offer
      const clearedOffer = EmbedBuilder.from(bonusEmbed).setDescription("Selection confirmed.");
      await message.edit({ embeds: [clearedOffer], components: [] });

      if (i.customId === "accept_mini") {
        const questionEndTime = Math.floor(Date.now() / 1000) + 30;
        const challengeEmbed = new EmbedBuilder()
          .setTitle("🎯 Bonus Question!")
          .setDescription(`⏰ **Bonus Ends** <t:${questionEndTime}:R>\n\n${challenge.question}`)
          .setColor("#00FF00");

        const optionsRow = new ActionRowBuilder().addComponents(
          challenge.options.map((opt, idx) =>
            new ButtonBuilder().setCustomId(`mini_opt_${idx}`).setLabel(opt).setStyle(ButtonStyle.Primary)
          )
        );

        const questionMessage = await interaction.followUp({ embeds: [challengeEmbed], components: [optionsRow], fetchReply: true });
        const optionCollector = questionMessage.createMessageComponentCollector({ 
          filter: i => i.user.id === userId, 
          max: 1, 
          time: 30000 
        });

        optionCollector.on("collect", async optInt => {
          await optInt.deferUpdate();
          const s2 = activeTrivia.get(userId);
          if (!s2 || s2.exiting) return safeResolve(currentScore, s2 || session);

          const selectedIndex = parseInt(optInt.customId.split("_")[2]);
          const selected = challenge.options[selectedIndex];
          const correct = challenge.options[challenge.correctIndex];
          const isCorrect = (selected === correct);

          // Build result embed BEFORE using it in .edit()
          const resultEmbed = new EmbedBuilder()
            .setTitle(isCorrect ? "✅ Correct!" : "❌ Incorrect")
            .setDescription(`**Question:** ${challenge.question}\n**Correct Answer:** ${correct}`)
            .setColor(isCorrect ? "#00FF00" : "#FF0000");

          await questionMessage.edit({ embeds: [resultEmbed], components: [] });

          if (isCorrect) {
            currentScore += challenge.points;
            await interaction.followUp({ content: `✅ Correct! You earned ${challenge.points} bonus points.` });
          } else {
            await interaction.followUp({ content: `❌ Wrong! The correct answer was **${correct}**.` });
          }

          safeResolve(currentScore, s2 || session);
        });

        
        optionCollector.on("end", async (collected, reason) => {
          if (!collected.size && reason === "time") {
            const timeoutEmbed = EmbedBuilder.from(challengeEmbed)
              .setDescription(`⏰ **Time's up!**\nThe correct answer was: **${challenge.options[challenge.correctIndex]}**`)
              .setColor("#808080");
            
            await questionMessage.edit({ embeds: [timeoutEmbed], components: [] });
            safeResolve(currentScore, activeTrivia.get(userId) || session);
          }
        });

      } else {
        await interaction.followUp({ content: "No worries! Continuing with the main game." });
        safeResolve(currentScore, s || session);
      }
    });

    
    collector.on("end", async (collected, reason) => {
      if (!collected.size && reason === "time") {
        const timeoutOffer = EmbedBuilder.from(bonusEmbed)
          .setDescription("⏰ **Time's up!** Mini-challenge declined.")
          .setColor("#808080");
        
        await message.edit({ embeds: [timeoutOffer], components: [] });
        safeResolve(currentScore, activeTrivia.get(userId) || session);
      }
    });
  });
}