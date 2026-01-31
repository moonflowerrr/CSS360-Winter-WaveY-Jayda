import { activeTrivia } from "../helpers/activeTrivia.js";
import { evaluateAnswer } from "../helpers/evaluateAnswer.js";

export default {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;

    const state = activeTrivia.get(message.author.id);
    if (!state) return;

    const userAnswer = message.content.trim();

    // correctAnswer can be "A", "B", "C", or "D"
    const { isCorrect, message: response } = evaluateAnswer(
      userAnswer,
      state.correctAnswer
    );

    await message.reply(response);

    // stop further guesses
    activeTrivia.delete(message.author.id);
  },
};
