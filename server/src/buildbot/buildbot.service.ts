import { map } from 'rxjs/operators';
import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BuilderResponse } from '@shared/buildbot/response/builder-response.model';
import { BuildResponse } from '@shared/buildbot/response/build-response.model';
import { StepResponse } from '@shared/buildbot/response/step-response.model';
import { BuildPropertyResponse } from '@shared/buildbot/response/build-property-response.model';

const authenticate = (http: HttpService, cookie) => {
  http.get('/auth/login', {
    validateStatus: (status) => {
      return status < 303; // Reject only if the status code is greater than or equal to 500
    },
  }).subscribe((response) => {
    cookie.value = response.headers['set-cookie'][1];
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

  /**
   * Return All builders information
   *
   * @returns {Observable<BuilderResponse>}
   */
  getBuilders(): Observable<BuilderResponse> {
    return this.httpService.get('/api/v2/builders').pipe(
      map(response => response.data as BuilderResponse),
    );
  }

  getBuildbotServerInfo() {
    return {
      url : this.httpService.axiosRef.defaults.baseURL,
    };
  }

  /**
   *  Get specific builder information
   * @param {number} builderId
   */
  getBuilder(builderId: number): Observable<BuilderResponse> {
    return this.httpService.get(`/api/v2/builders/${builderId}`).pipe(
      map(response => response.data as BuilderResponse),
    );
  }

  /**
   * Fetch a number of build made by specific builder
   *
   * @param {number} builderId
   * @param {number} [limit]
   * @returns Build Response containing a list of build
   */
  getBuilds(builderId: number, limit: number): Observable<BuildResponse> {
    return this.httpService.get(`api/v2/builders/${builderId}/builds?limit=${limit}&order=-number&property=owner&property=workername`).pipe(
      map(response => response.data as BuildResponse),
    );
  }

  // TODO: test method
  /**
   * Get information about a specific build
   *
   * @param {number} builderId the ID or name of the builder
   * @param {number} buildId the number of the build within the builder
   * @returns Response containing Collection of Build
   */
  getBuild(builderId: number, buildId: number) {
    return this.httpService.get(`api/v2/builders/${builderId}/builds/${buildId}`).pipe(
      map(response => response.data as BuildResponse),
    );
  }

  /**
   * Return all builds in progress - current progress
   * TODO: test methods
   * @returns {Observable<BuildResponse>}
   */
  getBuildsInProgress(): Observable<BuildResponse> {
    return this.httpService.get('api/v2/builds?complete=false&order=-started_at').pipe(
      map(response => response.data as BuildResponse),
    );
  }

  // TODO: test method
  /**
   * return all steps for the given build
   *
   * @param {number} buildId
   * @returns Steps informations
   */
  getBuildSteps(buildId: number) {
    return this.httpService.get(`api/v2/builds/${buildId}/steps`).pipe(
      map(response => response.data as StepResponse),
    );
  }

  /**
   * return all properties of a build
   *
   * @param {number} buildId
   * @returns build properties
   */
  getBuildProperties(buildId: number) {
    return this.httpService.get(`api/v2/builds/${buildId}/properties`).pipe(
      map(response => response.data as BuildPropertyResponse),
    );
  }

}
