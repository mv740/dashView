import { IBuilder } from './../../../shared/src/buildbot/IBuilder';
import { IBuilderResponse } from 'shared/buildbot/Response/IBuilderResponse';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BuildbotService } from './buildbot.service';
import {map} from 'rxjs/operators';
import { identity } from 'rxjs';

@Controller('buildbot')
export class BuildbotController {
    constructor(private readonly buildbotService: BuildbotService) {}

    @Get('builders')
    async getBuilders() {
        return await this.buildbotService.getBuilders();
    }

    @Get('builders/:builderId/builds')
    async getBuilder(@Param('builderId', new ParseIntPipe()) builderId, @Query('limit') limit: number = 10)
    {
        return this.buildbotService.getBuilds(builderId, limit);
    }

    @Get('progress')
    async getProgress(){
        return await this.buildbotService.getBuildsInProgress();
    }

    @Get()
    root(): string {
        return 'buildbotController';
    }
}
