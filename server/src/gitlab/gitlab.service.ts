import { Injectable } from '@nestjs/common';
import Gitlab from 'gitlab';
import { Project } from '@shared/gitlab/project.model';
// TODO: change this to .env
import gitlabConfig from './gitlab.config.json';

@Injectable()
export class GitlabService {

  private gitlabApi = null;

  constructor() {
    this.gitlabApi = new Gitlab({
      token : gitlabConfig.token,
      url: gitlabConfig.url,
    });
  }

  GetProjects(): Promise<Array<Project>>
  {
    // without memership true, take 5+ seconds
    // maxPages: 1
    return this.gitlabApi.Projects.all({visibility: 'private', membership: true});
  }
}
