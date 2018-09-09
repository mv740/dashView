/**
 *
 *
 * @export
 * @interface BuildResponse
 */
import { Meta } from '../meta.model';
import { Build } from '../build.model';

export interface BuildResponse {
    builds: Build[];
    meta: Meta;
}