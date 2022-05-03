import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './apis/app.controller';
import { AppService } from './resource/app.service';
import { DiscordModule } from './core/discord/discord.module';
import { CommandModule } from './commands/command.module';
import { UserModule } from './resource/user/user.module';

@Module({
  imports: [
    CommandModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    DiscordModule.forRoot(process.env.DISCORD_TOKEN),

    // Api Modules
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
