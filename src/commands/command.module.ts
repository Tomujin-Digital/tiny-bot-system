import { Module } from '@nestjs/common';
import { PingCommand } from './ping.command';
import { VideoCommand } from './video.command';

@Module({
  providers: [PingCommand, VideoCommand],
})
export class CommandModule {}
