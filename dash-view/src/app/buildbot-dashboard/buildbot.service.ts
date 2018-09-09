import { BuilderResponse } from 'shared/buildbot/response/builder-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuildResponse } from 'shared/buildbot/response/build-response.model';
import { Observable } from 'rxjs';
import { Build } from 'shared/buildbot/build.model';
import { map } from 'rxjs/operators';

@Injectable()
export class BuildbotService {

  private readonly backendUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  getBuilders(): Observable<BuilderResponse> {
    return this.httpClient.get<BuilderResponse>(this.backendUrl + '/buildbot/builders');
  }

  getBuilderBuilds(builderId: number): Observable<Build[]> {
    return this.httpClient.get<BuildResponse>(this.backendUrl + `/buildbot/builders/${builderId}/builds?limit=3`).pipe(
      map(response => response.builds as Build[]),
    );
  }
}
