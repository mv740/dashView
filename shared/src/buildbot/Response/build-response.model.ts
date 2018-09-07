import { Build } from "../build";
import { Meta } from "../meta";

/**
 *
 *
 * @export
 * @interface BuildResponse
 */
export interface BuildResponse {
    builds: Build[];
    meta:   Meta;
}