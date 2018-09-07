/**
 * Build step
 *
 * @export
 * @interface Step
 */
export interface Step {
    buildid:      number;
    complete:     boolean;
    complete_at:  number;
    hidden:       boolean;
    name:         string;
    number:       number;
    results:      number;
    started_at:   number;
    state_string: string;
    stepid:       number;
    urls:         any[];
}