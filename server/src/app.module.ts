import { Module } from '@nestjs/common';
import { BuildbotModule } from './buildbot/buildbot.module';
import { GitlabService } from './gitlab/gitlab.service';
import { GitlabController } from './gitlab/gitlab.controller';

@Module({
  imports: [BuildbotModule],
  providers: [GitlabService],
  controllers: [GitlabController],
})

export class AppModule {}
