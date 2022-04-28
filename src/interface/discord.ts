import { Message } from 'discord.js';

export type DiscordClient = (
  command: string,
  callback: (message: Message) => void,
) => void;
