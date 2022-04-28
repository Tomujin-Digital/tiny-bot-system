import { Inject } from '@nestjs/common';
import { Message } from 'discord.js';
import { DiscordClient } from '../interface/discord';

export class PingCommand {
  constructor(
    @Inject('DISCORD_CLIENT') private readonly discord: DiscordClient,
  ) {
    this.discord('!ping', this.run);
  }
  run(message: Message) {
    message.reply('pong');
  }
}
