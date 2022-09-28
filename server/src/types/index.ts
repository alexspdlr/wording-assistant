/* -------------------------------------------------------------------------- */
/*                                   GENERAL                                  */
/* -------------------------------------------------------------------------- */

export interface DispatchableEvent {
  command: string;
  payload: {
    [key: string]: any;
  };
}

export interface ReceivableEvent {
  code: string;
  payload: {
    [key: string]: any;
  };
}

/* -------------------------------------------------------------------------- */
/*                                   PUPPET                                   */
/* -------------------------------------------------------------------------- */

export interface PuppetState {
  stateName: string;
  data: {
    [key: string]: any;
  };
}

export interface PuppetInfo {
  id: number;
  puppetState: PuppetState;
}
