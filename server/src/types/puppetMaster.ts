/* eslint-disable @typescript-eslint/ban-types */
import { PuppetInfo } from './puppet';

/* -------------------------------------------------------------------------- */
/*                             DISPATCHABLE EVENT                             */
/* -------------------------------------------------------------------------- */

export interface PuppetMasterDispatchableEvent {
  command: string;
  payload: {
    [key: string]: any;
  };
}

/* -------------------------------------------------------------------------- */
/*                             RECEIVABLE EVENT                               */
/* -------------------------------------------------------------------------- */

export interface PuppetMasterReceivableEvent {
  code: string;
  payload: {
    [key: string]: any;
  };
}

/* -------------------------------------------------------------------------- */
/*                             OTHER                                          */
/* -------------------------------------------------------------------------- */
