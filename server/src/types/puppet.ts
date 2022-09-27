/* eslint-disable @typescript-eslint/ban-types */

/* -------------------------------------------------------------------------- */
/*                                    STATE                                   */
/* -------------------------------------------------------------------------- */

export type PuppetState = PuppetWaitingState | PuppetProcessingState;

/* --------------------------------- Waiting -------------------------------- */
type PuppetWaitingState =
  | WAITING_FOR_SELECT_TEXT
  | WAITING_FOR_SELECT_WORD
  | WAITING_FOR_SELECT_WORDING_ALTERNATIVE;

interface WAITING_FOR_SELECT_TEXT {
  stateName: 'waitingForSelectText';
  data: {};
}

interface WAITING_FOR_SELECT_WORD {
  stateName: 'waitingForSelectWord';
  data: {};
}

interface WAITING_FOR_SELECT_WORDING_ALTERNATIVE {
  stateName: 'waitingForSelectWordingAlternative';
  data: {};
}

/* ------------------------------- Processing ------------------------------- */
export type PuppetProcessingState =
  | PROCESSING_INITIALIZE
  | PROCESSING_GENERATE_REPHRASING_BASE
  | PROCESSING_GENERATE_WORDING_ALTERNATIVES
  | PROCESSING_GENERATE_REPHRASED_TEXT
  | PROCESSING_DESELECT_WORD
  | PROCESSING_TERMINATE;

export const puppetProcessingStateNames = {
  PROCESSING_INITIALIZE: 'processingInitialize',
  PROCESSING_GENERATE_REPHRASING_BASE: 'processingGenerateRephrasingBase',
  PROCESSING_GENERATE_WORDING_ALTERNATIVES:
    'processingGenerateWordingAlternatives',
  PROCESSING_GENERATE_REPHRASED_TEXT: 'processingGenerateRephrasedText',
  PROCESSING_DESELECT_WORD: 'processingDeselectWord',
  PROCESSING_TERMINATE: 'processingTerminate',
};

interface PROCESSING_INITIALIZE {
  stateName: 'processingInitialize';
  data: {};
}

interface PROCESSING_GENERATE_REPHRASING_BASE {
  stateName: 'processingGenerateRephrasingBase';
  data: {};
}

interface PROCESSING_GENERATE_WORDING_ALTERNATIVES {
  stateName: 'processingGenerateWordingAlternatives';
  data: {};
}

interface PROCESSING_GENERATE_REPHRASED_TEXT {
  stateName: 'processingGenerateRephrasedText';
  data: {};
}

interface PROCESSING_DESELECT_WORD {
  stateName: 'processingDeselectWord';
  data: {};
}

interface PROCESSING_TERMINATE {
  stateName: 'processingTerminate';
  data: {};
}

/* -------------------------------------------------------------------------- */
/*                             DISPATCHABLE EVENT                             */
/* -------------------------------------------------------------------------- */

export type PuppetUserDispatchableEvent =
  | SELECT_TEXT
  | DESELECT_TEXT
  | SELECT_WORD
  | DESELECT_WORD
  | SELECT_WORDING_ALTERNATIVE;

type PuppetServerDispatchableEvent = START_PUPPET | EXIT_PUPPET;

export type PuppetDispatchableEvent =
  | PuppetServerDispatchableEvent
  | PuppetUserDispatchableEvent;

/* ---------------------------- SERVER DISPATCHED --------------------------- */

export interface START_PUPPET {
  command: 'START_PUPPET';
  payload: {
    id: number;
  };
}
export interface EXIT_PUPPET {
  command: 'EXIT_PUPPET';
  payload: {};
}

/* ----------------------------- USER DISPATCHED ---------------------------- */
export interface SELECT_TEXT {
  command: 'SELECT_TEXT';
  payload: {
    inputText: string;
  };
}

interface DESELECT_TEXT {
  command: 'DESELECT_TEXT';
  payload: {};
}

interface SELECT_WORD {
  command: 'SELECT_WORD';
  payload: {};
}
interface DESELECT_WORD {
  command: 'DESELECT_WORD';
  payload: {};
}

interface SELECT_WORDING_ALTERNATIVE {
  command: 'SELECT_WORDING_ALTERNATIVE';
  payload: {};
}

/* -------------------------------------------------------------------------- */
/*                             RECEIVABLE EVENT                               */
/* -------------------------------------------------------------------------- */

export type PuppetReceivableEvent =
  | PUPPET_START_COMPLETED
  | PUPPET_EXIT_COMPLETED
  | PUPPET_SELECT_TEXT_COMPLETED
  | PUPPET_OTHER_ACTION_COMPLETED;

interface PUPPET_START_COMPLETED {
  code: 'PUPPET_START_COMPLETED';
  payload: {
    id: number;
  };
}

interface PUPPET_EXIT_COMPLETED {
  code: 'PUPPET_EXIT_COMPLETED';
  payload: {};
}

interface PUPPET_SELECT_TEXT_COMPLETED {
  code: 'PUPPET_SELECT_TEXT_COMPLETED';
  payload: {
    rephrasingBase: string;
  };
}
interface PUPPET_OTHER_ACTION_COMPLETED {
  code: 'PUPPET_OTHER_ACTION_COMPLETED';
  payload: {};
}

/* -------------------------------------------------------------------------- */
/*                             OTHER                                          */
/* -------------------------------------------------------------------------- */

export interface PuppetInfo {
  id: number;
  puppetState: PuppetState;
}
