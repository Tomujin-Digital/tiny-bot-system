import { Inject } from '@nestjs/common';
import { Message } from 'discord.js';

export class PingCommand {
  constructor(@Inject('DISCORD_CLIENT') private readonly discor: any) {
    this.discor('!ping', this.run);
  }
  run(message: Message) {
    message.reply('pong');
  }
}
