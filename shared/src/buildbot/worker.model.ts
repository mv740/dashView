import {ConfiguredOn} from './configured-on.model';
import {WorkerInfo} from './worker-info.model';

export interface Worker {
    configured_on: ConfiguredOn[];
    connected_to: any[];
    graceful: boolean;
    name: string;
    paused: boolean;
    workerid: number;
    workerinfo: WorkerInfo;
}