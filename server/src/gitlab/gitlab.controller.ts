import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/utils/decorators/request-mapping.decorator';
import { GitlabService } from './gitlab.service';

@Controller('gitlab')
export class GitlabController {

  constructor(private gitlabService: GitlabService){

  }

  @Get()
  root(){
    return 'GitlabController';
  }

  @Get('projects')
  async GetProjects() {
  return this.gitlabService.GetProjects();

  }
}
