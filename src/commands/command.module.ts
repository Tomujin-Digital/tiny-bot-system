import { Inject, Module } from '@nestjs/common';
import { Client, Message } from 'discord.js';
import { PingCommand } from './ping.command';

@Module({})
export class CommandModule {
  constructor(
    @Inject('DISCORD_CLIENT') private readonly client: Client<boolean>,
  ) {
    const pingCommand = new PingCommand(client);
    this.client.on('messageCreate', async (message: Message) => {
      const [command, ...args] = message.content.split(' ');
      console.log(args);

      if (command.toLocaleLowerCase() === 'quest')
        await pingCommand.message(message);

      if (command.toLocaleLowerCase() === 'video')
        await pingCommand.video(message);
    });

    this.client.on('messageReactionAdd', async (message, user) => {
      if (user.bot) return;
      await pingCommand.reactionAdd(message, user);
    });

    this.client.on('interactionCreate', (interaction) => {
      pingCommand.answerChecker(interaction);
    });

    // discord.on('messageReactionAdd', (interaction) => callback(interaction));
    // discord.on('messageReactionRemove', (interaction) => callback(interaction)),
  }
}
