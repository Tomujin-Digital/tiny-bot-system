import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class AppService {
  constructor(@Inject('DISCORD_CLIENT') private readonly client: Client) {
    this.client.on('message', (message) => {
      if (message.content === '<@968744592994349080>') {
        message.channel.send('Hello World!');
      }
      if (message.content.includes('ping')) {
        const target = message.mentions.members.first();
        if (!target) message.channel.send(':wave:');
        message.channel.send('Hello! ' + '<@' + target.user.id + '>');
      }
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
