import { activeTrivia } from "./activeTrivia.js";
import { userMention } from "discord.js";

export function showScoreboard(interaction) {
  const userId = interaction.user.id;
  const session = activeTrivia.get(userId);
  const score = session?.score ?? 0;
  const questions = session?.questionCount ?? 0;
  const maxStreak = session?.maxStreak ?? 0;

  // Avoid divide-by-zero
  const percent = questions > 0 ? score / questions : 0;
  const percentLabel = `${Math.round(percent * 100)}%`;

  const didWin = percent >= 0.5; // 50% or more = win

  const winGif =
    "https://media.tenor.com/L9kNtb5Ak2IAAAAM/congrats-congratulations.gif";

  // Pick any losing gif you like (Tenor link shown as example)
    const loseGif =
  "https://media.discordapp.net/attachments/1460739756404117610/1477151957327151259/loser.gif";
  
  // Dynamic Icon based on the Best Streak
  let streakIcon = "⭐";
  if (maxStreak >= 3) streakIcon = "🔥";
  if (maxStreak >= 5) streakIcon = "🧨";
  if (maxStreak >= 8) streakIcon = "☄️";
  
  const embed = {
    title: didWin ? `🏆 Trivia Complete! 🎆🎉` : `💀 Trivia Complete... 😵‍💫`,
    description:
      `${userMention(userId)}, your trivia game has ended!\n\n` +
      `Questions answered: **${questions}**\n` +
      `Your score: **${score}/${questions}** (**${percentLabel}**)\n` +
      `Bonus Points: **${session.miniChallengeScore}**\n` +
      `Best Streak: **${maxStreak}** ${streakIcon}\n\n` +
      (didWin
        ? `✅ Congrats! You scored **50%+**!`
        : `❌ Oof, You Lost — under **50%**! Try again!`),
    image: { url: didWin ? winGif : loseGif },
    color: didWin ? 0xffd700 : 0xff4d4d,
  };

  interaction.followUp({ embeds: [embed], ephemeral: true });

  // Clear the active session
  activeTrivia.delete(userId);
}