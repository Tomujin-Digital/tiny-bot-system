import { Inject } from '@nestjs/common';
import { Interaction, Message } from 'discord.js';
import { DiscordClient } from '../interface/discord';

export class VideoCommand {
  constructor(
    @Inject('DISCORD_CLIENT') private readonly discord: DiscordClient,
  ) {
    this.discord('!video', this.sendSomething).messageListen();
    this.discord('some_id', this.videoLinkSentInteraction).interactionLister();
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
  async sendSomething(message: Message) {
    message.channel.send({
      embeds: [
        {
          title: 'some title',
          description: 'some description',
        },
      ],
      components: [
        {
          type: 1,
          components: [
            {
              style: 1,
              label: 'some label',
              customId: 'some_id',
              disabled: false,
              type: 2,
            },
            {
              style: 1,
              label: 'some label',
              customId: 'some_id1',
              disabled: false,
              type: 2,
            },
            {
              style: 1,
              label: 'some label',
              customId: 'some_id2',
              disabled: false,
              type: 2,
            },
            {
              style: 1,
              label: 'some label',
              customId: 'some_id3',
              disabled: false,
              type: 2,
            },
          ],
        },
      ],
    });
    message.channel.send('Something');
  }
}
