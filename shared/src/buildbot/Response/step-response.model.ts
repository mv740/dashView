import { Meta } from './../meta';
import { Step } from "../step";

/**
 *
 *
 * @export
 * @interface StepResponse
 */
export interface StepResponse {
    meta:  Meta;
    steps: Step[];
}