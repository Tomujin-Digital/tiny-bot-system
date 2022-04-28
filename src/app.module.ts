import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './apis/app.controller';
import { AppService } from './services/app.service';
import { DiscordModule } from './core/discord/discord.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    DiscordModule.forRoot(process.env.DISCORD_TOKEN),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
