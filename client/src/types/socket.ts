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

interface ActiveWorkerStateData_WaitingForSelectText {}
interface ActiveWorkerStateData_WaitingForSelectWord {}
interface ActiveWorkerStateData_WaitingForSelectWordingAlternative {}

interface ActiveWorkerStateData_ProcessingInitialize {}
interface ActiveWorkerStateData_ProcessingSelectText {}
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
  payload: SocketServerEventPayload;
}

type SocketServerEventEndpoint =
  | 'setupFinished'
  | 'selectTextFinished'
  | 'deselectTextFinished'
  | 'selectWordFinished'
  | 'deselectWordFinished'
  | 'selectWordingAlternativeFinished';

type SocketServerEventPayload =
  | SocketServerEventPayload_SetupFinished
  | SocketServerEventPayload_SelectTextFinished
  | SocketServerEventPayload_DeselectTextFinished
  | SocketServerEventPayload_SelectWordFinished
  | SocketServerEventPayload_DeselectWordFinished
  | SocketServerEventPayload_SelectWordingAlternativeFinished;

export interface SocketServerEventPayload_SetupFinished {
  serverState: string;
  data: {};
}
export interface SocketServerEventPayload_SelectTextFinished {
  serverState: string;
  data: {};
}

export interface SocketServerEventPayload_DeselectTextFinished {
  serverState: string;
  data: {};
}

export interface SocketServerEventPayload_SelectWordFinished {
  serverState: string;
  data: {};
}

export interface SocketServerEventPayload_DeselectWordFinished {
  serverState: string;
  data: {};
}

export interface SocketServerEventPayload_SelectWordingAlternativeFinished {
  serverState: string;
  data: {};
}
