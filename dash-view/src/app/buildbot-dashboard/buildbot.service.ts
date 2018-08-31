import { Observable } from 'rxjs';
import { IBuilderResponse } from 'shared/buildbot/Response/IBuilderResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BuildbotService {

    private readonly backendUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  getBuilds(): Observable<IBuilderResponse>  {
    return this.httpClient.get<IBuilderResponse>(this.backendUrl + '/buildbot/test');
  }
}
