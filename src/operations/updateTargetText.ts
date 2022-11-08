import { Page } from 'puppeteer';
import { PuppeteerResponse } from '../types';

/**
 *
 *  Simulates the client-action-event "updateTargetText" by executing the following steps on the DeepL Website using Puppeter:
 *
 *    1. Paste the new target text (specified by client) into the translator target
 *    2. Return the new target text
 *
 * @param page
 * @param textAreaSelector
 * @param newTargetText
 * @returns newTargetText
 */

const updateTargetText = async (
  page: Page,
  textAreaSelector: string,
  newTargetText: string
): Promise<PuppeteerResponse> => {
  try {
    await page.waitForSelector(textAreaSelector);

    // Paste the new text into the translator target
    await page.evaluate((newTargetText) => {
      const translatorTargetInput = document.querySelector(
        '[dl-test=translator-target-input]'
      ) as HTMLTextAreaElement | null;

      if (
        translatorTargetInput &&
        translatorTargetInput.value !== newTargetText
      ) {
        translatorTargetInput.value = newTargetText;
      }
    }, newTargetText);

    // Move the caret to trigger an update of the dummy div
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');

    // Return new text
    return {
      type: 'response',
      data: {
        targetText: newTargetText,
      },
    };
  } catch (error) {
    return {
      type: 'error',
      data: {
        location: 'updateTargetText',
        message: String(error),
      },
    };
  }
};

export default updateTargetText;
