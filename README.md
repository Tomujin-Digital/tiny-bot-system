# Setup

> requirement:
```
 nodejs v16.13^
 yarn package manager 1.22^
```
> Setup
```bash
  yarn install
```

```ts
  DISCORD_TOKEN=token
  MONGO_URI=mongodb://localhost:27017
```

```bash
  yarn start
  yarn start:dev
  yarn dev
```

# Бот хөгжүүлэлт хийх

Эндээс бот токен аваарай. https://discord.com/developers

Bot client service дотроо ашиглах:
```ts
class SomeService{
  constructor(
    Inject('DISCORD_CLIENT') private readonly client: Client
    ) {
      this.client.on('message', (message) => {
        //...
      })
    }
}
```


  