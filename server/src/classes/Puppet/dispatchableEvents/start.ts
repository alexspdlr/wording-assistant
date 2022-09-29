import { Browser, Page } from 'puppeteer';
import puppeteer_setup from '../../../operations/setup';
import {
  ReceivableEventPayload_StartCompleted,
  ReceivableEventWorker,
} from '../../../types';

const start = async (
  id: string,
  updateLocalState: (page?: Page, browser?: Browser) => void,
  respondToPuppet: (response: ReceivableEventWorker) => void
) => {
  const { page, browser } = await puppeteer_setup();

  updateLocalState(page, browser);

  const payload: ReceivableEventPayload_StartCompleted = {
    id,
  };

  const response: ReceivableEventWorker = {
    code: 'START_COMPLETED',
    payload: payload,
  };

  respondToPuppet(response);
};
export default start;
