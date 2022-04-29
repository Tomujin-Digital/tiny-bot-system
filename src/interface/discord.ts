export type DiscordClient = (
  command: string,
  callback: (message: any) => void,
) => { messageListen: () => void; interactionLister: () => void };
