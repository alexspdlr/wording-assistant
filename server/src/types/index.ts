/* -------------------------------------------------------------------------- */
/*                                   GENERAL                                  */
/* -------------------------------------------------------------------------- */

import { ActiveWorkerState } from './socket';

export interface DispatchableEvent {
  command: string;
  payload: {
    [key: string]: any;
  };
}

export interface ReceivableEvent {
  code: string;
  payload: {
    [key: string]: any;
  };
}

/* -------------------------------------------------------------------------- */
/*                                   PUPPET                                   */
/* -------------------------------------------------------------------------- */

export interface PuppetInfo {
  id: number;
  activeWorkerState: ActiveWorkerState;
}

export interface ReceivableEventPuppet extends ReceivableEvent {
  puppetInfo: PuppetInfo[];
}
