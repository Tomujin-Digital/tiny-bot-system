# Setup

> requirement:
```
 nodejs v16.13^
 yarn package manager 1.22^
```
> Setup

.env file дээрээ тохиргоо хийхээ мартваа.
```bash
  yarn install
  cp .env.example .env
```


```bash
  yarn start
  yarn start:dev
  yarn dev
```

# Бот хөгжүүлэлт хийх

Эндээс бот токен аваарай. https://discord.com/developers


Нэмж bot command бичихдээ **commands** гэсэн хавтсанд нэмээрэй.

Нэмж Bot command бичих загвар:
```ts
class SomeService{
  constructor(
    Inject('DISCORD_CLIENT') private readonly discord:      
    DiscordClient
    ) {
      discord("commend", testFunction)

    }

    this.testFunction(message: Messsage) {
      message.reply("Hello World");
    }
}
```


  