import { Controller, Get } from '@nestjs/common';
import { BuildbotService } from './buildbot.service';
import {map} from 'rxjs/operators';

@Controller('buildbot')
export class BuildbotController {
    constructor(private readonly buildbotService: BuildbotService) {}

    @Get('test')
    async getBuilders() {
        return await this.buildbotService.getBuilders().pipe(
            map(response => response.data),
          );

    }

    @Get()
    root(): string {
        return 'testController';
      }
}
