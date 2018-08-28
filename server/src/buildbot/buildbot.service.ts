import { map } from 'rxjs/operators';
import { IBuilderResponse } from 'shared/buildbot/Response/IBuilderResponse';
import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

const authenticate = (http: HttpService, cookie ) => {
    http.get('/auth/login', {
        validateStatus:  (status) => {
        return status < 303; // Reject only if the status code is greater than or equal to 500
      }}).subscribe((response) => {
         const set_cookie = response.headers['set-cookie'][1];
         cookie.value = set_cookie;
      });
};

@Injectable()
export class BuildbotService {

  private cookie = {
      value: null,
  };

  constructor(private readonly httpService: HttpService) {
    httpService.axiosRef.interceptors.request.use(
        config => {
          config.headers.Cookie = this.cookie.value;
          return config;
        },
        error => Promise.reject(error),
      );

    authenticate(httpService, this.cookie);
  }
  getBuilders(): Observable<IBuilderResponse> {
    return  this.httpService.get('/api/v2/builders').pipe(
      map(response => response.data as IBuilderResponse),
    );
  }
}
