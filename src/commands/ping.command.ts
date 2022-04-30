import { Inject } from '@nestjs/common';
import { Message, MessageReaction, User } from 'discord.js';
import { DiscordClient } from '../interface/discord';

export class PingCommand {
  constructor(
    @Inject('DISCORD_CLIENT') public readonly discord: DiscordClient,
  ) {
    this.discord.listen('test run', this.run).message();
    this.discord.listen('test run', this.reactionAdd).reactionAdd();
  }
  async run(message: Message) {
    const replied = await message.channel.send('pong');
    replied.react('😁');
  }
  public async consoler() {
    console.log('Something');
  }

  async reactionAdd(message: MessageReaction, user: User) {
    if (message.emoji.name === '😁') {
      console.log(user.id);
    }
    console.log('reaction add');
  }
}
