import { Observable } from 'rxjs';
import { BuilderResponse } from 'shared/buildbot/response/builder-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BuildbotService {

    private readonly backendUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  getBuilds(): Observable<BuilderResponse>  {
    return this.httpClient.get<BuilderResponse>(this.backendUrl + '/buildbot/test');
  }
}
