import { Module } from '@nestjs/common';
import { BuildbotModule } from './buildbot/buildbot.module';

@Module({
  imports: [BuildbotModule],
})

export class AppModule {}
