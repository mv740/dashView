import { BuilderResponse } from 'shared/buildbot/response/builder-response.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuildResponse } from 'shared/buildbot/response/build-response.model';
import { Observable } from 'rxjs';
import { Build } from 'shared/buildbot/build.model';
import { map } from 'rxjs/operators';
import { Builder } from 'shared/buildbot/builder.model';

@Injectable()
export class BuildbotService {

  private readonly backendUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  getBuilders(): Observable<Builder[]> {
    return this.httpClient.get<BuilderResponse>(this.backendUrl + '/buildbot/builders').pipe(
      map(response => response.builders),
    );
  }

  getBuilderBuilds(builderId: number): Observable<Build[]> {
    return this.httpClient.get<BuildResponse>(this.backendUrl + `/buildbot/builders/${builderId}/builds?limit=3`).pipe(
      map(response => response.builds),
    );
  }

  getPendingBuilds(): Observable<number> {
    return this.httpClient.get<BuildResponse>(this.backendUrl + '/buildbot/progress').pipe(
      map(response => response.meta.total)
    );
  }
}
