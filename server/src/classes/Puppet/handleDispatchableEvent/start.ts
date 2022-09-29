import { Browser, Page } from 'puppeteer';
import puppeteer_setup from '../../../operations/setup';
import {
  ReceivableEventPayload_PuppetStartCompleted,
  ReceivableEventPuppet,
} from '../../../types';

const start = async (
  id: number,
  updateLocalState: (page?: Page, browser?: Browser) => void,
  respondToPuppet: (response: ReceivableEventPuppet) => void
) => {
  const { page, browser } = await puppeteer_setup();

  updateLocalState(page, browser);

  const payload: ReceivableEventPayload_PuppetStartCompleted = {
    id,
  };

  const response: ReceivableEventPuppet = {
    code: 'PUPPET_START_COMPLETED',
    payload: payload,
  };

  respondToPuppet(response);
};
export default start;
