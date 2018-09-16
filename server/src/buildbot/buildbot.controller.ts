import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BuildbotService } from './buildbot.service';

@Controller('buildbot')
export class BuildbotController {
  constructor(private readonly buildbotService: BuildbotService) {
  }

  @Get('builders')
  async getBuilders() {
    return await this.buildbotService.getBuilders();
  }

  @Get('builders/:builderId')
  async getBuilder(@Param('builderId', new ParseIntPipe()) builderId) {
    return this.buildbotService.getBuilder(builderId);
  }

  @Get('builders/:builderId/builds')
  async getBuilderBuilds(@Param('builderId', new ParseIntPipe()) builderId, @Query('limit') limit: number = 10) {
    return this.buildbotService.getBuilds(builderId, limit);
  }

  @Get('builders/:builderId/builds/:buildId')
  async getBuild(@Param('builderId', new ParseIntPipe()) builderId, @Param('buildId', new ParseIntPipe()) buildId,) {
    return this.buildbotService.getBuild(builderId, buildId);
  }

  @Get('progress')
  async getProgress() {
    return await this.buildbotService.getBuildsInProgress();

  }

  @Get()
  root(): string {
    return 'buildbotController';
  }
}
