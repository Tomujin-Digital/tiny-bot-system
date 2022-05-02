import { Inject } from '@nestjs/common';
import { Client, Message, MessageReaction, User } from 'discord.js';
// import { DiscordClient } from '../interface/discord';

export class PingCommand {
  users: string[];
  constructor(@Inject('DISCORD_CLIENT') private readonly: Client) {}
  public async consoler() {
    console.log('Something');
  }

  async run(message: Message) {
    const replied = await message.channel.send('okay');
    replied.react('1️⃣');
    replied.react('2️⃣');
  }

  async reactionAdd(message: MessageReaction, user: User) {
    this.consoler();
    console.log(user.bot);
    if (user.bot) return;
    if (message.emoji.name === '1️⃣')
      message.message.reply(
        "Sorry! You didn't get the point" + `<@${user.id}>`,
      );
    if (message.emoji.name === '2️⃣')
      message.message.reply('You get the point! ' + `<@${user.id}>`);
  }
}
