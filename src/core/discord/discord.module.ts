import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Client, Intents, Message } from 'discord.js';

@Module({})
export class DiscordModule {
  static forRoot(token: string): DynamicModule {
    const discord = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });
    discord.on('ready', () => {
      console.log(`Logged in as ${discord.user.tag}!`);
    });
    discord.login(token);

    const discordCallback = (
      command: string,
      callback: (message: Message) => void,
    ) => {
      discord.on('message', (message: Message) => {
        // Mention тооцох, Dynamic биш байна
        const content = message.content.toLowerCase();
        if (content === command) callback(message);
      });
    };

    const discordProvider: Provider = {
      provide: 'DISCORD_CLIENT',
      useValue: discordCallback,
    };
    return {
      module: DiscordModule,
      providers: [discordProvider],
      exports: [discordProvider],
      global: true,
    };
  }
}
