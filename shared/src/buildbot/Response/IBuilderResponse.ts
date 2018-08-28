import { IMeta } from './../IMeta';
import { IBuilder } from './../IBuilder';
export interface IBuilderResponse {
    builders: IBuilder[];
    meta:     IMeta;
}