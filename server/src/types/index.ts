/* eslint-disable @typescript-eslint/no-empty-interface */
/* -------------------------------------------------------------------------- */
/*                                   GENERAL                                  */
/* -------------------------------------------------------------------------- */

import { Browser, Page } from 'puppeteer';
import { Puppet } from '../classes/Puppet/Puppet';
import { ActiveWorkerState } from './socket';

/* ------------------------------ DISPATCHABLE ------------------------------ */
export interface DispatchableEvent {
  command: DispatchableEventCommand;
  payload: DispatchableEventPayload;
}

type DispatchableEventCommand =
  | 'SELECT_TEXT'
  | 'DESELECT_TEXT'
  | 'SELECT_WORD'
  | 'DESELECT_WORD'
  | 'SELECT_WORDING_ALTERNATIVE'
  | 'START_PUPPETMASTER'
  | 'EXIT_PUPPETMASTER'
  | 'START_PUPPET'
  | 'EXIT_PUPPET';

type DispatchableEventPayload =
  | DispatchableEventPayload_SelectText
  | DispatchableEventPayload_DeselectText
  | DispatchableEventPayload_SelectWord
  | DispatchableEventPayload_DeselectWord
  | DispatchableEventPayload_SelectWordingAlternative
  | DispatchableEventPayload_StartPuppetMaster
  | DispatchableEventPayload_ExitPuppetMaster
  | DispatchableEventPayload_StartPuppet
  | DispatchableEventPayload_ExitPuppet;

export interface DispatchableEventPayload_SelectText {
  inputText: string;
}
interface DispatchableEventPayload_DeselectText {}
interface DispatchableEventPayload_SelectWord {}
interface DispatchableEventPayload_DeselectWord {}
interface DispatchableEventPayload_SelectWordingAlternative {}
export interface DispatchableEventPayload_StartPuppetMaster {
  id: string;
  numberOfMaintainedPuppets: number;
}
interface DispatchableEventPayload_ExitPuppetMaster {}
export interface DispatchableEventPayload_StartPuppet {
  id: number;
}
interface DispatchableEventPayload_ExitPuppet {}

/* ------------------------------- RECEIVABLE ------------------------------- */
export interface ReceivableEvent {
  code: ReceivableEventCode;
  payload: ReceivableEventPayload;
  puppetInfo: PuppetInfo[];
}

type ReceivableEventCode =
  | 'PUPPET_START_COMPLETED'
  | 'PUPPET_EXIT_COMPLETED'
  | 'PUPPET_SELECT_TEXT_STARTED'
  | 'PUPPET_SELECT_TEXT_COMPLETED'
  | 'PUPPET_SELECT_WORD_STARTED'
  | 'PUPPET_SELECT_WORD_COMPLETED'
  | 'PUPPET_DESELECT_WORD_STARTED'
  | 'PUPPET_DESELECT_WORD_COMPLETED'
  | 'PUPPET_SELECT_WORDING_ALTERNATIVE_STARTED'
  | 'PUPPET_SELECT_WORDING_ALTERNATIVE_COMPLETED'
  | 'PUPPETMASTER_EXIT_COMPLETED'
  | 'PUPPETMASTER_START_COMPLETED';

type ReceivableEventPayload =
  | ReceivableEventPayload_PuppetStartCompleted
  | ReceivableEventPayload_PuppetExitCompleted
  | ReceivableEventPayload_PuppetSelectTextStarted
  | ReceivableEventPayload_PuppetSelectTextCompleted
  | ReceivableEventPayload_PuppetSelectWordStarted
  | ReceivableEventPayload_PuppetSelectWordCompleted
  | ReceivableEventPayload_PuppetDeselectWordStarted
  | ReceivableEventPayload_PuppetDeselectWordCompleted
  | ReceivableEventPayload_PuppetSelectWordingAlternativeStarted
  | ReceivableEventPayload_PuppetSelectWordingAlternativeCompleted
  | ReceivableEventPayload_PuppetmasterStartCompleted
  | ReceivableEventPayload_PuppetmasterExitCompleted;

export interface ReceivableEventPayload_PuppetStartCompleted {
  id: number;
}
export interface ReceivableEventPayload_PuppetExitCompleted {}
export interface ReceivableEventPayload_PuppetSelectTextStarted {
  inputText: string;
}
export interface ReceivableEventPayload_PuppetSelectTextCompleted {
  inputText: string;
  rephrasingBase: string;
}
interface ReceivableEventPayload_PuppetSelectWordStarted {}
interface ReceivableEventPayload_PuppetSelectWordCompleted {}
interface ReceivableEventPayload_PuppetDeselectWordStarted {}
interface ReceivableEventPayload_PuppetDeselectWordCompleted {}
interface ReceivableEventPayload_PuppetSelectWordingAlternativeStarted {}
interface ReceivableEventPayload_PuppetSelectWordingAlternativeCompleted {}
interface ReceivableEventPayload_PuppetmasterStartCompleted {}
interface ReceivableEventPayload_PuppetmasterExitCompleted {}

/* -------------------------------------------------------------------------- */
/*                                   PUPPET                                   */
/* -------------------------------------------------------------------------- */

export interface PuppetInfo {
  id: number;
  activeWorkerState: ActiveWorkerState;
}

export interface PuppetWorkerState {
  page: Page | null;
  browser: Browser | null;
}

export type ReceivableEventPuppet = Omit<ReceivableEvent, 'puppetInfo'>;

/* -------------------------------------------------------------------------- */
/*                                PUPPET MASTER                               */
/* -------------------------------------------------------------------------- */

export interface PuppetMasterWorkerState {
  puppets: Puppet[];
}
