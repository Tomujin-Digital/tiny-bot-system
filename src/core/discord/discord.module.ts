import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Client, Intents, Message } from 'discord.js';

@Module({})
export class DiscordModule {
  static forRoot(token: string): DynamicModule {
    const discord = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      ],
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    });
    discord.on('ready', () => {
      console.log(`Logged in as ${discord.user.tag}!`);
    });

    discord.login(token);

    const discordCallback = {
      client: discord,
      listen: (command: string, callback: (atr1?: any, atr2?: any) => void) => {
        return {
          message: () =>
            discord.on('message', (message: Message) => {
              console.log(message.content);
              // Mention тооцох, Dynamic биш байна
              // log бичих бүтэцтэй
              const content = message.content.toLowerCase();
              if (content === command) callback(message);
            }),
          interaction: () => discord.on('interactionCreate', callback),
          reactionAdd: () => discord.on('messageReactionAdd', callback),
          reactionRemove: () => discord.on('messageReactionRemove', callback),
        };
      },
    };
    const discordProvider: Provider = {
      provide: 'DISCORD_CLIENT',
      useValue: discordCallback,
    };
    const discordRootClient: Provider = {
      provide: 'DISCORD_ROOT_CLIENT',
      useValue: discord,
    };

    return {
      module: DiscordModule,
      providers: [discordProvider, discordRootClient],
      exports: [discordProvider, discordRootClient],
      global: true,
    };
  }
}
