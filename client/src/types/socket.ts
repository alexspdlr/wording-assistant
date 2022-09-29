/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
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
  | 'waitingForSelectWord'
  | 'waitingForSelectWordingAlternative';
type ActiveWorkerStateNameProcessing =
  | 'processingInitialize'
  | 'processingSelectText'
  | 'processingDeselectText'
  | 'processingSelectWord'
  | 'processingDeselectWord'
  | 'processingSelectWordingAlternative'
  | 'processingTerminate';

type ActiveWorkerStateDataWaiting =
  | ActiveWorkerStateData_WaitingForSelectText
  | ActiveWorkerStateData_WaitingForSelectWord
  | ActiveWorkerStateData_WaitingForSelectWordingAlternative;
type ActiveWorkerStateDataProcessing =
  | ActiveWorkerStateData_ProcessingInitialize
  | ActiveWorkerStateData_ProcessingSelectText
  | ActiveWorkerStateData_ProcessingDeselectText
  | ActiveWorkerStateData_ProcessingSelectWord
  | ActiveWorkerStateData_ProcessingDeselectWord
  | ActiveWorkerStateData_ProcessingSelectWordingAlternative
  | ActiveWorkerStateData_ProcessingTerminate;

export interface ActiveWorkerStateData_WaitingForSelectText {}
export interface ActiveWorkerStateData_WaitingForSelectWord {
  inputText: string;
  rephrasingBase: string;
}
interface ActiveWorkerStateData_WaitingForSelectWordingAlternative {}

interface ActiveWorkerStateData_ProcessingInitialize {}
export interface ActiveWorkerStateData_ProcessingSelectText {
  inputText: string;
}
interface ActiveWorkerStateData_ProcessingDeselectText {}
interface ActiveWorkerStateData_ProcessingSelectWord {}
interface ActiveWorkerStateData_ProcessingDeselectWord {}
interface ActiveWorkerStateData_ProcessingSelectWordingAlternative {}
interface ActiveWorkerStateData_ProcessingTerminate {}

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
  | 'selectWord'
  | 'deselectWord'
  | 'selectWordingAlternative';

type SocketClientEventPayload =
  | SocketClientEventPayload_SelectText
  | SocketClientEventPayload_DeselectText
  | SocketClientEventPayload_SelectWord
  | SocketClientEventPayload_DeselectWord
  | SocketClientEventPayload_SelectWordingAlternative;

export interface SocketClientEventPayload_SelectText {
  inputText: string;
}

export interface SocketClientEventPayload_DeselectText {}

export interface SocketClientEventPayload_SelectWord {}

export interface SocketClientEventPayload_DeselectWord {}

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
  | 'selectWordStarted'
  | 'selectWordCompleted'
  | 'deselectWordStarted'
  | 'deselectWordCompleted'
  | 'selectWordingAlternativeStarted'
  | 'selectWordingAlternativeCompleted';
