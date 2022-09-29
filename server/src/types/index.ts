/* eslint-disable @typescript-eslint/no-empty-interface */
/* -------------------------------------------------------------------------- */
/*                                   GENERAL                                  */
/* -------------------------------------------------------------------------- */

import { Browser, Page } from 'puppeteer';
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
  | 'START'
  | 'EXIT';

type DispatchableEventPayload =
  | DispatchableEventPayload_SelectText
  | DispatchableEventPayload_DeselectText
  | DispatchableEventPayload_SelectWord
  | DispatchableEventPayload_DeselectWord
  | DispatchableEventPayload_SelectWordingAlternative
  | DispatchableEventPayload_Start
  | DispatchableEventPayload_Exit;

export interface DispatchableEventPayload_SelectText {
  inputText: string;
}
export interface DispatchableEventPayload_DeselectText {
  id: string;
}

interface DispatchableEventPayload_SelectWord {}
interface DispatchableEventPayload_DeselectWord {}
interface DispatchableEventPayload_SelectWordingAlternative {}
export interface DispatchableEventPayload_Start {
  id: string;
}
export interface DispatchableEventPayload_Exit {}

/* ------------------------------- RECEIVABLE ------------------------------- */
export interface ReceivableEventWorker {
  code: ReceivableEventCode;
  payload: ReceivableEventPayload;
}

export interface ReceivableEvent extends ReceivableEventWorker {
  workerState: ActiveWorkerState;
}

type ReceivableEventCode =
  | 'START_COMPLETED'
  | 'EXIT_COMPLETED'
  | 'SELECT_TEXT_STARTED'
  | 'SELECT_TEXT_COMPLETED'
  | 'DESELECT_TEXT_STARTED'
  | 'DESELECT_TEXT_COMPLETED'
  | 'SELECT_WORD_STARTED'
  | 'SELECT_WORD_COMPLETED'
  | 'DESELECT_WORD_STARTED'
  | 'DESELECT_WORD_COMPLETED'
  | 'SELECT_WORDING_ALTERNATIVE_STARTED'
  | 'SELECT_WORDING_ALTERNATIVE_COMPLETED';

type ReceivableEventPayload =
  | ReceivableEventPayload_StartCompleted
  | ReceivableEventPayload_ExitCompleted
  | ReceivableEventPayload_SelectTextStarted
  | ReceivableEventPayload_SelectTextCompleted
  | ReceivableEventPayload_DeselectTextStarted
  | ReceivableEventPayload_DeselectTextCompleted
  | ReceivableEventPayload_SelectWordStarted
  | ReceivableEventPayload_SelectWordCompleted
  | ReceivableEventPayload_DeselectWordStarted
  | ReceivableEventPayload_DeselectWordCompleted
  | ReceivableEventPayload_SelectWordingAlternativeStarted
  | ReceivableEventPayload_SelectWordingAlternativeCompleted;

export interface ReceivableEventPayload_StartCompleted {
  id: string;
}
export interface ReceivableEventPayload_ExitCompleted {}
export interface ReceivableEventPayload_SelectTextStarted {
  inputText: string;
}
export interface ReceivableEventPayload_SelectTextCompleted {
  inputText: string;
  rephrasingBase: string;
}

export interface ReceivableEventPayload_DeselectTextStarted {}
export interface ReceivableEventPayload_DeselectTextCompleted {}
interface ReceivableEventPayload_SelectWordStarted {}
interface ReceivableEventPayload_SelectWordCompleted {}
interface ReceivableEventPayload_DeselectWordStarted {}
interface ReceivableEventPayload_DeselectWordCompleted {}
interface ReceivableEventPayload_SelectWordingAlternativeStarted {}
interface ReceivableEventPayload_SelectWordingAlternativeCompleted {}

/* -------------------------------------------------------------------------- */
/*                                   PUPPET                                   */
/* -------------------------------------------------------------------------- */

export interface PuppetWorkerState {
  page: Page | null;
  browser: Browser | null;
}
