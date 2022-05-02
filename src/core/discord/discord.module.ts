import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Client, Intents } from 'discord.js';

@Module({})
export class DiscordModule {
  static forRoot(token: string): DynamicModule {
    const discord = new Client({
      intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      ],
      partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'],
    });
    discord.on('ready', () => {
      console.log(`Logged in as ${discord.user.tag}!`);
    });

    discord.login(token);

    const discordCallback = discord;
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
