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

export type DispatchableEventCommand =
  | 'SELECT_TEXT'
  | 'DESELECT_TEXT'
  | 'MOVE_CURSOR'
  | 'UPDATE_TARGET_TEXT'
  | 'SELECT_WORDING_ALTERNATIVE'
  | 'START'
  | 'EXIT';

type DispatchableEventPayload =
  | DispatchableEventPayload_SelectText
  | DispatchableEventPayload_DeselectText
  | DispatchableEventPayload_MoveCursor
  | DispatchableEventPayload_UpdateTargetText
  | DispatchableEventPayload_SelectWordingAlternative
  | DispatchableEventPayload_Start
  | DispatchableEventPayload_Exit;

export interface DispatchableEventPayload_SelectText {
  inputText: string;
}
export interface DispatchableEventPayload_DeselectText {}

export interface DispatchableEventPayload_MoveCursor {
  newCursorIndex: number;
}
export interface DispatchableEventPayload_UpdateTargetText {
  newTargetText: string;
  postChangeCursorIndex: number;
}

export interface DispatchableEventPayload_SelectWordingAlternative {
  selectedAlternativeIndex: number;
}
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
  | 'MOVE_CURSOR_STARTED'
  | 'MOVE_CURSOR_COMPLETED'
  | 'UPDATE_TARGET_TEXT_STARTED'
  | 'UPDATE_TARGET_TEXT_COMPLETED'
  | 'SELECT_WORDING_ALTERNATIVE_STARTED'
  | 'SELECT_WORDING_ALTERNATIVE_COMPLETED';

type ReceivableEventPayload =
  | ReceivableEventPayload_StartCompleted
  | ReceivableEventPayload_ExitCompleted
  | ReceivableEventPayload_SelectTextStarted
  | ReceivableEventPayload_SelectTextCompleted
  | ReceivableEventPayload_DeselectTextStarted
  | ReceivableEventPayload_DeselectTextCompleted
  | ReceivableEventPayload_MoveCursorStarted
  | ReceivableEventPayload_MoveCursorCompleted
  | ReceivableEventPayload_UpdateTargetTextStarted
  | ReceivableEventPayload_UpdateTargetTextCompleted
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
export interface ReceivableEventPayload_MoveCursorStarted {
  newCursorIndex: number;
}
export interface ReceivableEventPayload_MoveCursorCompleted {
  rephrasingOptions: string[];
}
export interface ReceivableEventPayload_UpdateTargetTextStarted {
  newCursorIndex: number;
  updatedText: string;
}
export interface ReceivableEventPayload_UpdateTargetTextCompleted {
  rephrasingOptions: string[];
}
export interface ReceivableEventPayload_SelectWordingAlternativeStarted {
  selectedAlternativeIndex: number;
}
export interface ReceivableEventPayload_SelectWordingAlternativeCompleted {
  rephrasingResult: string;
}

/* -------------------------------------------------------------------------- */
/*                                   PUPPET                                   */
/* -------------------------------------------------------------------------- */

export interface PuppetWorkerState {
  page: Page | null;
  browser: Browser | null;
}
