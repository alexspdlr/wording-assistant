/********* IMPORTANT: The following types need to be kept synced between Front-End & Back-End *********/

// Emittable Socket Events

export type EmittableSocketEvent =
  | SELECT_TEXT
  | DESELECT_TEXT
  | SELECT_WORD
  | DESELECT_WORD
  | SELECT_WORDING_ALTERNATIVE;

interface SELECT_TEXT {
  eventName: 'selectText';
  payload: {
    inputText: string;
  };
}

interface DESELECT_TEXT {
  eventName: 'deselectText';
  payload: {};
}

interface SELECT_WORD {
  eventName: 'selectWord';
  payload: {};
}

interface DESELECT_WORD {
  eventName: 'deselectWord';
  payload: {};
}

interface SELECT_WORDING_ALTERNATIVE {
  eventName: 'selectWordingAlternative';
  payload: {};
}

// Receivable Socket Events
