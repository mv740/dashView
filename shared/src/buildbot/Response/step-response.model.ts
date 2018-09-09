
import { Meta } from '../meta.model';
import { Step } from '../step.model';

export interface StepResponse {
    meta: Meta;
    steps: Step[];
}