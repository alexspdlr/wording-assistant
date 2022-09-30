/* eslint-disable @typescript-eslint/no-empty-interface */
/********* IMPORTANT: The following types need to be kept synced between Front-End & Back-End *********/

/* -------------------------------------------------------------------------- */
/*                                    STATE                                   */
/* -------------------------------------------------------------------------- */

export interface ActiveWorkerState {
  stateName: ActiveWorkerStateNameWaiting | ActiveWorkerStateNameProcessing;
  data: ActiveWorkerStateDataWaiting | ActiveWorkerStateDataProcessing;
}

type ActiveWorkerStateNameWaiting =
  | 'waitingForSelectText'
  | 'waitingForMoveCursor'
  | 'waitingForSelectWordingAlternative';
type ActiveWorkerStateNameProcessing =
  | 'processingInitialize'
  | 'processingSelectText'
  | 'processingDeselectText'
  | 'processingMoveCursor'
  | 'processingUpdateTargetText'
  | 'processingSelectWordingAlternative'
  | 'processingTerminate';

type ActiveWorkerStateDataWaiting =
  | ActiveWorkerStateData_WaitingForSelectText
  | ActiveWorkerStateData_WaitingForMoveCursor
  | ActiveWorkerStateData_WaitingForSelectWordingAlternative;
type ActiveWorkerStateDataProcessing =
  | ActiveWorkerStateData_ProcessingInitialize
  | ActiveWorkerStateData_ProcessingSelectText
  | ActiveWorkerStateData_ProcessingDeselectText
  | ActiveWorkerStateData_ProcessingMoveCursor
  | ActiveWorkerStateData_ProcessingUpdateTargetText
  | ActiveWorkerStateData_ProcessingSelectWordingAlternative
  | ActiveWorkerStateData_ProcessingTerminate;

export interface ActiveWorkerStateData_WaitingForSelectText {}
export interface ActiveWorkerStateData_WaitingForMoveCursor {
  inputText?: string;
  rephrasingBase?: string;
  rephrasingOptions?: string[];
}
interface ActiveWorkerStateData_WaitingForSelectWordingAlternative {}

interface ActiveWorkerStateData_ProcessingInitialize {}
export interface ActiveWorkerStateData_ProcessingSelectText {
  inputText: string;
}
export interface ActiveWorkerStateData_ProcessingDeselectText {}
export interface ActiveWorkerStateData_ProcessingMoveCursor {}
export interface ActiveWorkerStateData_ProcessingUpdateTargetText {}
export interface ActiveWorkerStateData_ProcessingSelectWordingAlternative {}
export interface ActiveWorkerStateData_ProcessingTerminate {}

/* -------------------------------------------------------------------------- */
/*                    Events that are triggered CLIENT SIDE                   */
/* -------------------------------------------------------------------------- */

export interface SocketClientEvent {
  endpoint: SocketClientEventEndpoint;
  payload: SocketClientEventPayload;
}

type SocketClientEventEndpoint =
  | 'selectText'
  | 'deselectText'
  | 'moveCursor'
  | 'updateTargetText'
  | 'selectWordingAlternative';

type SocketClientEventPayload =
  | SocketClientEventPayload_SelectText
  | SocketClientEventPayload_DeselectText
  | SocketClientEventPayload_MoveCursor
  | SocketClientEventPayload_UpdateTargetText
  | SocketClientEventPayload_SelectWordingAlternative;

export interface SocketClientEventPayload_SelectText {
  inputText: string;
}

export interface SocketClientEventPayload_DeselectText {}

export interface SocketClientEventPayload_MoveCursor {
  newCursorIndex: number;
}

export interface SocketClientEventPayload_UpdateTargetText {
  newTargetText: string;
  postChangeCursorIndex: number;
}

export interface SocketClientEventPayload_SelectWordingAlternative {}

/* -------------------------------------------------------------------------- */
/*                    Events that are triggered SERVER SIDE                   */
/* -------------------------------------------------------------------------- */

export interface SocketServerEvent {
  endpoint: SocketServerEventEndpoint;
  payload: ActiveWorkerState;
}

export type SocketServerEventEndpoint =
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
  | 'selectWordingAlternativeCompleted';
