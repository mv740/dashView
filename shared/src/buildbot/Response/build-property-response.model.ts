/**
 * http://docs.buildbot.net/latest/developer/rest.html#id25
 * all properties of a build
 *
 * @export
 * @interface BuildPropertyResponse
 */
import { BuildProperty } from '../build-property.model';
import { Meta } from '../meta.model';

export interface BuildPropertyResponse {
    meta: Meta;
    properties: BuildProperty[];
}