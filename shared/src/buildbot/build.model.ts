import { Properties } from './properties.model';

/**
 * http://docs.buildbot.net/latest/developer/rest.html#build
 *
 * @export
 * @interface Build
 */
export interface Build {
    builderid: number;
    buildid: number;
    buildrequestid: number;
    complete: boolean;
    complete_at: number;
    masterid: number;
    number: number;
    properties: Properties;
    results: number;
    started_at: number;
    state_string: string;
    workerid: number;
}
