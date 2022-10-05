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

export interface ActiveWorkerStateData {
  id: string;
  originalText: string | null;
  targetText: string | null;
  cursorIndex: number;
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
  originalText: string;
}

export interface ClientActionPayload_DeselectText {}

export interface ClientActionPayload_MoveCursor {
  newCursorIndex: number;
}

export interface ClientActionPayload_UpdateTargetText {
  newTargetText: string;
  postChangeCursorIndex: number;
}

export interface ClientActionPayload_SelectWordingAlternative {
  selectedAlternativeIndex: number;
}

/* -------------------------------------------------------------------------- */
/*                    Events that are triggered SERVER SIDE                   */
/* -------------------------------------------------------------------------- */

export interface ServerResponseEvent {
  endpoint: ServerResponseEndpoint;
  workerState: ActiveWorkerState;
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
