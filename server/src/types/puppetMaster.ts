/* eslint-disable @typescript-eslint/ban-types */
import { PuppetInfo, PuppetUserDispatchableEvent } from './puppet';

/* -------------------------------------------------------------------------- */
/*                             DISPATCHABLE EVENT                             */
/* -------------------------------------------------------------------------- */

export type PuppetMasterDispatchableEvent =
  | PuppetMasterServerDispatchableEvent
  | PuppetUserDispatchableEvent;

/* ---------------------------- SERVER DISPATCHED --------------------------- */

type PuppetMasterServerDispatchableEvent =
  | START_PUPPETMASTER
  | EXIT_PUPPETMASTER;
interface START_PUPPETMASTER {
  command: 'START_PUPPETMASTER';
  payload: {
    id: string;
    numberOfMaintainedPuppets: number;
  };
}

interface EXIT_PUPPETMASTER {
  command: 'EXIT_PUPPETMASTER';
  payload: {};
}

/* ----------------------------- USER DISPATCHED ---------------------------- */

export type PuppetMasterUserDispatchableEvent = PuppetUserDispatchableEvent;

/* -------------------------------------------------------------------------- */
/*                             RECEIVABLE EVENT                               */
/* -------------------------------------------------------------------------- */

export interface PuppetMasterReceivableEvent {
  code: PuppetMasterReceivableEventCode;
  payload: PuppetInfo[];
}

type PuppetMasterReceivableEventCode =
  | 'PUPPETMASTER_START_COMPLETED'
  | 'PUPPETMASTER_EXIT_COMPLETED'
  | 'PUPPETMASTER_ERROR_OCCURED'
  | 'PUPPETMASTER_OTHER_EVENT_COMPLETED';

/* -------------------------------------------------------------------------- */
/*                             OTHER                                          */
/* -------------------------------------------------------------------------- */
