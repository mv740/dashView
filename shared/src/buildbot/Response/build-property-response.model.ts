import { Meta } from './../meta';
import { BuildProperty } from "../build-property";

/**
 * http://docs.buildbot.net/latest/developer/rest.html#id25
 * all properties of a build
 *
 * @export
 * @interface BuildPropertyResponse
 */
export interface BuildPropertyResponse {
    meta:       Meta;
    properties: BuildProperty[];
}