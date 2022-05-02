import { Inject, Module } from '@nestjs/common';
import { Client, Message } from 'discord.js';
import { PingCommand } from './ping.command';

@Module({
  providers: [PingCommand],
})
export class CommandModule {
  constructor(
    @Inject('DISCORD_CLIENT') private readonly client: Client<boolean>,
  ) {
    this.client.on('messageCreate', (message: Message) => {
      const commands = new PingCommand(client);
      if (commands[message.content]) commands[message.content](message);
    });
    // discord.on('interactionCreate', (interaction) => callback(interaction));
    // discord.on('messageReactionAdd', (interaction) => callback(interaction));
    // discord.on('messageReactionRemove', (interaction) => callback(interaction)),
  }
}
