import { userMention } from "discord.js";

const CHANNEL_NAME = process.env.CHANNEL_NAME;

const event = {
  name: "guildMemberAdd",
  async execute(member) {
    const channel = member.guild.channels.cache.find(
      (channel) => channel.name === CHANNEL_NAME
    );

<<<<<<< HEAD
    const welcomeMessage = getWelcomeMessage(member.id);
=======
    /*
      TODO: Change getWelcomeMessage to getWelcomeMessageWithMeme to send a meme to welcome your user.
    */
    const welcomeMessage = await getWelcomeMessageWithMeme(member.id);
>>>>>>> upstream/main
    channel.send(welcomeMessage);
  },
};

const getWelcomeMessage = (userId) => {
  /*
    Welcome message when a new member joins.
    This is the bot's intro message. Customize as needed.
  */
  return {
<<<<<<< HEAD
    content: `Welcome ${userMention(userId)}! 👋\n
I'm WaveY — your friendly study helper bot. I can generate practice questions for you. Use the `/quiz` command to get a question with a sample answer. Hope you enjoy your time here!`,
=======
    content: `Welcome ${userMention(userId)},
    to the WaveY Trivia Bot server! To play the game
    you will be given trivia questions and four answers
    to choose from. I will then tell you if you are wrong or right.
    For help type '/' to see my commands. Have fun!

  `,
>>>>>>> upstream/main
  };
};

export default event;
