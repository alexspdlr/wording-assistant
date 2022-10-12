/* eslint-disable @typescript-eslint/no-empty-interface */
/********* IMPORTANT: The following types need to be kept synced between Front-End & Back-End *********/

/* -------------------------------------------------------------------------- */
/*                                    STATE                                   */
/* -------------------------------------------------------------------------- */

export interface ActiveWorkerState {
  stateName: ActiveWorkerStateName;
  data: ActiveWorkerStateData;
}

export type ActiveWorkerStateName =
  | 'waitingForSelectText'
  | 'waitingForTargetTextAction'
  | 'processingInitialize'
  | 'processingSelectText'
  | 'processingDeselectText'
  | 'processingMoveCursor'
  | 'processingUpdateTargetText'
  | 'processingSelectWordingAlternative'
  | 'processingTerminate'
  | 'processingError';

export interface ActiveWorkerTextSelection {
  startIndex: number;
  endIndex: number;
  value: string;
}

export interface ActiveWorkerStateData {
  id: string;
  cursorIndex: number;
  originalTextSelection: ActiveWorkerTextSelection | null;
  activeTextSelection: ActiveWorkerTextSelection | null;
  rephrasingOptions: string[];
}

/* -------------------------------------------------------------------------- */
/*                    Events that are triggered CLIENT SIDE                   */
/* -------------------------------------------------------------------------- */

export interface ClientActionEvent {
  endpoint: ClientActionEndpoint;
  payload: ClientActionPayload;
}

export type ClientActionEndpoint =
  | 'selectText'
  | 'deselectText'
  | 'moveCursor'
  | 'updateTargetText'
  | 'selectWordingAlternative';

export type ClientActionPayload =
  | ClientActionPayload_SelectText
  | ClientActionPayload_DeselectText
  | ClientActionPayload_MoveCursor
  | ClientActionPayload_UpdateTargetText
  | ClientActionPayload_SelectWordingAlternative;

export interface ClientActionPayload_SelectText {
  eventId: string;
  newOriginalTextSelection: ActiveWorkerTextSelection;
}

export interface ClientActionPayload_DeselectText {
  eventId: string;
}

export interface ClientActionPayload_MoveCursor {
  eventId: string;
  newCursorIndex: number;
}

export interface ClientActionPayload_UpdateTargetText {
  eventId: string;
  newActiveTextSelection: ActiveWorkerTextSelection;
}

export interface ClientActionPayload_SelectWordingAlternative {
  eventId: string;
  selectedAlternativeIndex: number;
}

/* -------------------------------------------------------------------------- */
/*                    Events that are triggered SERVER SIDE                   */
/* -------------------------------------------------------------------------- */

export interface ServerResponseEvent {
  endpoint: ServerResponseEndpoint;
  payload: ServerResponsePayload;
}

export interface ServerResponsePayload {
  workerState: ActiveWorkerState;
  eventId: string;
}

export type ServerResponseEndpoint =
  | 'setupCompleted'
  | 'selectTextStarted'
  | 'selectTextCompleted'
  | 'deselectTextStarted'
  | 'deselectTextCompleted'
  | 'moveCursorStarted'
  | 'moveCursorCompleted'
  | 'updateTargetTextStarted'
  | 'updateTargetTextCompleted'
  | 'selectWordingAlternativeStarted'
  | 'selectWordingAlternativeCompleted'
  | 'processingErrorStarted'
  | 'processingErrorCompleted';
