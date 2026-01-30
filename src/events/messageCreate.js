import { getMeme } from "../helpers/meme.js";

const event = {
  name: "messageCreate",
  execute(message) {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === 'hello') {
      getMeme().then(meme => {
        message.reply({
          content: "Here’s a meme for you :) :)",
          embeds: [meme],
        });
      });
    }
  },
};

export default event;