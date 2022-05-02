import { Inject } from '@nestjs/common';
import { Interaction } from 'discord.js';

export class VideoCommand {
  constructor(@Inject('DISCORD_CLIENT') private readonly discord: any) {
    // this.discord.listen('!video', this.sendSomething).message();
    // this.discord.listen('some_id', this.videoLinkSentInteraction).interaction();
  }

  // Step 2
  async videoLinkSentInteraction(interaction: Interaction) {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'some_id') {
      interaction.reply({
        content:
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        ephemeral: true,
      });
    }
  }
  // Step 1
}
