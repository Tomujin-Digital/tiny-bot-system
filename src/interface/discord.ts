import { Client } from 'discord.js';

export type DiscordClient = {
  client: Client<boolean>;
  listen: (
    command: string,
    callback: (att1?: any, att2?: any) => void,
  ) => {
    discord: Client<boolean>;
    message: () => void;
    interaction: () => void;
    reactionAdd: () => void;
    reactionRemove: () => void;
  };
};
