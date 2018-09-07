/**
 * 
 *
 * @export
 * @interface BuildProperty
 */
export interface BuildProperty {
    branch:      Array<null | string>;
    builddir:    string[];
    buildername: string[];
    buildnumber: Array<number | string>;
    codebase:    string[];
    project:     string[];
    repository:  string[];
    revision:    Array<null | string>;
    scheduler:   string[];
    slavename:   string[];
    workername:  string[];
}