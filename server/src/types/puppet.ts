/* eslint-disable @typescript-eslint/ban-types */

/* -------------------------------------------------------------------------- */
/*                                    STATE                                   */
/* -------------------------------------------------------------------------- */

export interface PuppetState {
  stateName: string;
  data: {
    [key: string]: any;
  };
}

/* -------------------------------------------------------------------------- */
/*                             DISPATCHABLE EVENT                             */
/* -------------------------------------------------------------------------- */

export interface PuppetDispatchableEvent {
  command: string;
  payload: {
    [key: string]: any;
  };
}

/* -------------------------------------------------------------------------- */
/*                             RECEIVABLE EVENT                               */
/* -------------------------------------------------------------------------- */

export interface PuppetReceivableEvent {
  code: string;
  payload: {
    [key: string]: any;
  };
}

/* -------------------------------------------------------------------------- */
/*                             OTHER                                          */
/* -------------------------------------------------------------------------- */

export interface PuppetInfo {
  id: number;
  puppetState: PuppetState;
}
