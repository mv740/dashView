import { Meta } from './../meta.model';
import { Builder } from './../builder.model';

export interface BuilderResponse {
    builders: Builder[];
    meta:     Meta;
}