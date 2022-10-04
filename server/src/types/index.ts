/* eslint-disable @typescript-eslint/no-empty-interface */
import { Browser, Page } from 'puppeteer';
import { EventManager } from '../classes/EventManager/EventManager';
import {
  ActiveWorkerState,
  ClientActionEndpoint,
  ClientActionPayload,
  ServerResponseEndpoint,
} from './socket';

export interface PuppetState {
  page: Page | null;
  browser: Browser | null;
  eventManager: EventManager;
  workerState: ActiveWorkerState;
}

export interface ClientActionPayload_StartWorker {
  id: string;
}

export type ClientActionPayload_TerminateWorker = Record<string, never>;
export interface ClientActionEvent_Extended {
  endpoint: ClientActionEndpoint | 'startWorker' | 'terminateWorker';
  payload:
    | ClientActionPayload
    | ClientActionPayload_StartWorker
    | ClientActionPayload_TerminateWorker;
}

export interface ServerResponseEvent_Extended {
  endpoint: ServerResponseEndpoint | 'exitCompleted';
  workerState: ActiveWorkerState;
}

export interface PuppeteerError {
  location: string;
  message: string;
}

export interface PuppeteerResponse {
  type: 'response' | 'error';
  data: any;
}
