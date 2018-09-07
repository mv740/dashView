import { ConfiguredOn } from './configured-on';
import { WorkerInfo } from './worker-info';
export interface Worker {
    configured_on: ConfiguredOn[];
    connected_to:  any[];
    graceful:      boolean;
    name:          string;
    paused:        boolean;
    workerid:      number;
    workerinfo:    WorkerInfo;
}