**CSS 360 WaveY Trivia Discord Bot**

![Image](https://www.ignitesocialmedia.com/wp-content/uploads/2018/02/YpJilaXXT8qJR6HQVKFM_ISM_Trivia.gif)

**Course:** CSS 360

**Team Members:** Jayda, Aditi, Giselle, Audrey

**Overview:**

WaveY Trivia is an interactive Discord bot that lets users play a multiple-choice, categorized trivia game directly in a Discord server. 

The bot lets users start a personal trivia session via a slash command. Each game presents the user with four categories, randomized questions, tracks the player's score, and provides immediate feedback after each answer, and lets the user know if they won or lost at the end.

**Features:**
- When the bot comes online, a message displays
- Start a game with "/trivia"
- Personalized welcome message with instructions
- Interactive category buttons
- Interactive difficulty level buttons
- Timer to show how much time is available to the user per question
- Multiple-choice categorized questions
- Interactive buttons to choose answers
- Immediate correct/incorrect feedback (with the correct answer if user was wrong)
- Green/Red change in button colors based on incorrect/correct answers
- Bonus round questions which do not affect overall score or number of questions that can be attemoted
- Automatic progression through questions
- The final scoreboard and results is displayed after 10 questions
- A leaderboard which ranks all the attempts of users who have interacted with the bot
- Exit command to end game early with "/exit"
- Session management to prevent faulty gameplay

**2.1 Version Updates:**
- Users can now select the level of difficulty after selecting the category.
- Users are now able to see a timer indicating the number of seconds (starts at 45s) they have left before the session times out across the questions, category selection, bonus round, difficulty level.
- Mini challenges (bonus rounds) scattered throughout the game
- Threshold for winning is now higher at 75%.
- A leaderboard which appears at the end of every game which ranks all the attempts of multiple users.
- A fun fact accompanying the leaderboard button.


**GamePlay:**

When the bot comes online, it will prompt the user to use the /trivia command in the text channel  

The user can run the "/trivia" command to launch their own trivia game!

To begin the game, the bot will print a personal welcome message with instructions. A timer also appears indicating the amount of time a user has to make a choice before the session ends.  

Then, four interactive buttons will appear, allowing the user to select a category. Once a category is selected, the bot will confirm the user's choice. Following this, the user can select the level of difficulty for their game. Then, the game begins.

This will be followed by a categorized question and 4 multiple choice answers. 

After selecting an answer using the interactive buttons, the user can then be notified if the answer to the prompted question is correct or incorrect.

The Trivia Bot will post a "Correct!" or "Incorrect!" in the Discord server, and if incorrect, the correct answer will be displayed as well. The button color will also change to green if correct and red if incorrect. Throughout the game, the bot will also show your streak once 3 questions are answered correctly and the score. The game consists of 10 questions, so as the game progresses, the bot will update your score and streak, then display it in the chat.

The next question will automatically appear for the user after the current question is answered, and no repeat questions will be offered. 

Mini challenges (bonus rounds) appear throughout the game which function as a "break" from the game. They do not affect score or number of questions in any way.

Once the user completes 10 questions, the scoreboard will appear, displaying: 
- The number of questions answered
- The best streak
- The user's score with a percentage
- Whether the user won or lost
- Number of bonus points gained
- Prompt to view leaderboard

Lastly, the game ends!


**Session Management:** 

The bot will only allow one active game session per user, if another instance of a game is attempted the bot will inform the user that they already have an active game going. To add, the bot will inform the user that there is not current trivia session if they try to use the exit command while not in an active game session.

Timeout features are implemented for both categories and multiple-choice buttons. If no button is selected after 45 seconds, the bot will time the user out to protect the session. The user will be informed and can now safely create a new game whenever they would like. 

**Ending Game Early:**

If you would like to end the game early, use the "/exit" command to display the scoreboard and end the game immediately, even if you haven't reached the full 10 questions. You win if you answered more than or equal to 75% of the questions correctly.

**Running Bot Locally:**

Prerequisites: 
- Node.js(v16 or higher)
- Discord Developer Application
- Registered bot token

SetUp Instructions: 
- Clone the Repository

```bash
git clone <repository-url>`
cd <repository-folder>
```
- Install dependencies
  
```bash 
npm install
```

Create a .env file

```
TOKEN=your_discord_bot_token
CLIENT_ID=your_application_client_id
GUILD_ID=your_test_server_id
```

- Sync slash commands in the terminal
(when commands are updated) 

```bash
node deploy-commands.js
```

- Start the bot

```bash
npm start
```

After running:
The bot should respond to /trivia once coming online












