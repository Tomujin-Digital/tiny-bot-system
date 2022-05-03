import { Inject } from '@nestjs/common';
import {
  Client,
  Interaction,
  Message,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from 'discord.js';

export class PingCommand {
  users: any = {};
  questions = [
    {
      question: 'What is PI number?',
      answer: 1,
      tricks: ['3.12', '3.14', '3.16', '3.18'],
    },
    {
      question: 'What is energy?',
      answer: 0,
      tricks: [
        'in physics, the capacity for doing work',
        'in physics, the energy of a molecule',
        'energy is the amount of work done',
        'energy is light',
      ],
    },
  ];
  constructor(@Inject('DISCORD_CLIENT') private readonly: Client) {}
  public async consoler() {
    console.log('Something');
  }

  emojiReader(emoji: any, type: 'unicode' | 'emoji' = 'unicode') {
    if (type === 'unicode')
      switch (emoji) {
        case '1️⃣':
          return 1;
        case '2️⃣':
          return 2;
        case '3️⃣':
          return 3;
        case '4️⃣':
          return 4;
        default:
          return 5;
      }
    if (type === 'emoji')
      switch (+emoji) {
        case 1:
          return '1️⃣';
        case 2:
          return '2️⃣';
        case 3:
          return '3️⃣';
        case 4:
          return '4️⃣';
        default:
          return '4️⃣';
      }
  }

  async video(message: Message) {
    message.channel.send(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
    );
  }
  async message(message: Message) {
    const userId = message.author.id;
    if (this.users[userId]) {
      this.users[userId].answered = false;
      this.users[userId].question++;
    } else {
      this.users[userId] = {
        answered: false,
        question: 0,
      };
    }

    if (!this.questions[this.users[userId].question]) {
      message.reply('Today daily challenge done for you XD');
      return;
    }
    message.channel.send({
      embeds: [
        {
          title: this.questions[this.users[userId].question].question,
          description: this.questions[this.users[userId].question].tricks
            .map(
              (trick, index) =>
                this.emojiReader(index + 1, 'emoji') + ' | ' + trick,
            )
            .join('\n'),
        },
      ],
      components: [
        {
          type: 1,
          components: this.questions[this.users[userId].question].tricks.map(
            (trick, index) => ({
              style: 1,
              label: this.emojiReader(index + 1, 'emoji') + ' | ' + trick,
              customId: 'answer_' + index,
              disabled: false,
              type: 2,
            }),
          ),
        },
      ],
    });
  }

  async answerChecker(interaction: Interaction) {
    if (!interaction.isButton) return;

    const user = interaction.member.user || interaction.channel;

    if (!this.users[user.id]) return;
    if (this.users[user.id].answered) return;
    if (!this.questions[this.users[user.id].question]) return;

    const answer = this.emojiReader(
      interaction.id.replace('answer_', ''),
      'unicode',
    ) as number;
    if (answer - 1 === this.questions[this.users[user.id].question].answer) {
      interaction.channel.send('Correct, You get the point! ');
    } else {
      interaction.channel.send("Sorry! You didn't get the point");
    }

    this.users[user.id].answered = true;
  }

  async reactionAdd(
    message: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
  ) {
    if (!this.users[user.id]) return;
    if (this.users[user.id].answered) return;
    if (user.bot) return;
    if (!this.questions[this.users[user.id].question]) return;
    const answer = this.emojiReader(message.emoji.name, 'unicode') as number;
    if (answer - 1 === this.questions[this.users[user.id].question].answer) {
      message.message.reply('Correct, You get the point! ');
    } else {
      message.message.reply("Sorry! You didn't get the point");
    }

    this.users[user.id].answered = true;
  }
}
