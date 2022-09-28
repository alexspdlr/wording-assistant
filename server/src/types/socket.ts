/* eslint-disable @typescript-eslint/ban-types */
/********* IMPORTANT: The following types need to be kept synced between Front-End & Back-End *********/

// Emittable Socket Events

export type ClientEmittableSocketEvent =
  | SELECT_TEXT
  | DESELECT_TEXT
  | SELECT_WORD
  | DESELECT_WORD
  | SELECT_WORDING_ALTERNATIVE;

interface SELECT_TEXT {
  payload: {
    inputText: string;
  };
}

interface DESELECT_TEXT {
  payload: {};
}

interface SELECT_WORD {
  payload: {};
}

interface DESELECT_WORD {
  payload: {};
}

interface SELECT_WORDING_ALTERNATIVE {
  payload: {};
}

// Receivable Socket Events
